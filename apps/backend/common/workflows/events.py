from common.events.models import BaseEvent


class WorkflowStartedEvent(BaseEvent):
    event_name = "workflow_started"

    def __init__(self, instance_id: int, entity_type: str, **kwargs):
        payload = {"instance_id": instance_id, "entity_type": entity_type}
        super().__init__(payload=payload, **kwargs)


class StateChangedEvent(BaseEvent):
    event_name = "workflow_state_changed"

    def __init__(
        self, instance_id: int, entity_type: str, old_state: str, new_state: str, **kwargs
    ):
        payload = {
            "instance_id": instance_id,
            "entity_type": entity_type,
            "old_state": old_state,
            "new_state": new_state,
        }
        super().__init__(payload=payload, **kwargs)


class WorkflowCompletedEvent(BaseEvent):
    event_name = "workflow_completed"

    def __init__(self, instance_id: int, entity_type: str, **kwargs):
        payload = {"instance_id": instance_id, "entity_type": entity_type}
        super().__init__(payload=payload, **kwargs)
