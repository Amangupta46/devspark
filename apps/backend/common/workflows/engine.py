from typing import Any, Dict

from common.events.bus import bus

from .events import StateChangedEvent, WorkflowCompletedEvent, WorkflowStartedEvent
from .models import WorkflowHistory, WorkflowInstance
from .statemachine import StateMachineError
from .templates import WorkflowDefinition


class WorkflowRegistry:
    _templates: Dict[str, WorkflowDefinition] = {}

    @classmethod
    def register(cls, template: WorkflowDefinition):
        cls._templates[template.id] = template

    @classmethod
    def get(cls, template_id: str) -> WorkflowDefinition:
        if template_id not in cls._templates:
            raise ValueError(f"Template {template_id} not registered")
        return cls._templates[template_id]


class WorkflowEngine:
    """
    Orchestrator linking State Machines to Django Persistence and Event systems.
    """

    @staticmethod
    def start_workflow(
        template_id: str, entity_type: str, entity_id: str, actor=None, metadata: dict = None
    ) -> WorkflowInstance:
        template = WorkflowRegistry.get(template_id)

        instance = WorkflowInstance.objects.create(
            definition_id=template.id,
            entity_type=entity_type,
            entity_id=str(entity_id),
            current_state=template.initial_state,
        )

        WorkflowHistory.objects.create(
            instance=instance,
            from_state="NONE",
            to_state=template.initial_state,
            action="START",
            actor=actor,
            metadata=metadata or {},
        )

        bus.publish(
            WorkflowStartedEvent(instance_id=instance.id, entity_type=entity_type), run_async=True
        )
        return instance

    @staticmethod
    def process_action(
        instance_id: int, action: str, context: Any = None, actor=None, comments: str = ""
    ) -> WorkflowInstance:
        """
        Pushes a workflow instance through a state transition based on the action provided.
        """
        instance = WorkflowInstance.objects.get(id=instance_id)
        if instance.is_completed:
            raise StateMachineError("Cannot process action on a completed workflow.")

        template = WorkflowRegistry.get(instance.definition_id)
        machine = template.build_machine()

        old_state = instance.current_state

        # Execute transition logic
        new_state = machine.execute_transition(old_state, action, context)

        # Determine if terminal
        state_obj = machine.states.get(new_state)
        is_terminal = state_obj.is_terminal if state_obj else False

        # Persist changes
        instance.current_state = new_state
        instance.is_completed = is_terminal
        instance.save()

        # Log history
        WorkflowHistory.objects.create(
            instance=instance,
            from_state=old_state,
            to_state=new_state,
            action=action,
            actor=actor,
            comments=comments,
        )

        # Emit standard event
        bus.publish(
            StateChangedEvent(
                instance_id=instance.id,
                entity_type=instance.entity_type,
                old_state=old_state,
                new_state=new_state,
            ),
            run_async=True,
        )

        if is_terminal:
            bus.publish(
                WorkflowCompletedEvent(instance_id=instance.id, entity_type=instance.entity_type),
                run_async=True,
            )

        return instance
