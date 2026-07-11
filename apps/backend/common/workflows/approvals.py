from .engine import WorkflowEngine
from .statemachine import State, TransitionRule
from .templates import WorkflowDefinition


class ApprovalEngine:
    """
    A highly specialized wrapper over the standard WorkflowEngine specifically tailored
    for Request -> Approve/Reject lifecycles.
    """

    @staticmethod
    def create_standard_approval_definition(process_name: str) -> WorkflowDefinition:
        """
        Dynamically generates a WorkflowDefinition for a simple sequential approval loop.
        """
        return WorkflowDefinition(
            id=f"{process_name}_approval",
            name=f"{process_name.capitalize()} Approval",
            states=[
                State(name="DRAFT", is_initial=True),
                State(name="PENDING_APPROVAL"),
                State(name="APPROVED", is_terminal=True),
                State(name="REJECTED", is_terminal=True),
            ],
            transitions=[
                TransitionRule(name="SUBMIT", from_state="DRAFT", to_state="PENDING_APPROVAL"),
                TransitionRule(name="APPROVE", from_state="PENDING_APPROVAL", to_state="APPROVED"),
                TransitionRule(name="REJECT", from_state="PENDING_APPROVAL", to_state="REJECTED"),
                # Optional: allow a rejected item to be moved back to draft for fixing
                TransitionRule(name="RESET", from_state="REJECTED", to_state="DRAFT"),
            ],
        )

    @staticmethod
    def submit_for_approval(instance_id: int, actor=None, comments: str = ""):
        return WorkflowEngine.process_action(
            instance_id, action="SUBMIT", actor=actor, comments=comments
        )

    @staticmethod
    def approve(instance_id: int, actor=None, comments: str = ""):
        return WorkflowEngine.process_action(
            instance_id, action="APPROVE", actor=actor, comments=comments
        )

    @staticmethod
    def reject(instance_id: int, actor=None, comments: str = ""):
        return WorkflowEngine.process_action(
            instance_id, action="REJECT", actor=actor, comments=comments
        )
