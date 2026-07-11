from dataclasses import dataclass, field
from typing import Any, Callable, Dict, List, Optional


@dataclass
class State:
    """Represents a discrete node in a workflow."""

    name: str
    description: str = ""
    is_initial: bool = False
    is_terminal: bool = False

    # Hooks that can be defined to run business logic when entering/exiting
    on_enter: Optional[Callable[[Any], None]] = None
    on_exit: Optional[Callable[[Any], None]] = None


@dataclass
class TransitionRule:
    """Defines valid movement from one state to another."""

    name: str
    from_state: str
    to_state: str

    # Conditions that must evaluate to True for the transition to be allowed
    conditions: List[Callable[[Any, Dict[str, Any]], bool]] = field(default_factory=list)

    # Optional hook to run during the transition itself
    on_transition: Optional[Callable[[Any, Dict[str, Any]], None]] = None


class StateMachineError(Exception):
    pass


class StateMachine:
    """
    Core engine evaluating rules and executing transitions.
    Operates strictly in-memory over defined State and Transition objects.
    """

    def __init__(self):
        self.states: Dict[str, State] = {}
        self.transitions: Dict[str, List[TransitionRule]] = {}

    def add_state(self, state: State):
        self.states[state.name] = state

    def add_transition(self, rule: TransitionRule):
        if rule.from_state not in self.transitions:
            self.transitions[rule.from_state] = []
        self.transitions[rule.from_state].append(rule)

    def can_transition(self, current_state: str, action: str, context: Any, **kwargs) -> bool:
        """
        Checks if a transition from current_state via action is permitted
        by evaluating all attached conditions.
        """
        rules = self.transitions.get(current_state, [])
        for rule in rules:
            if rule.name == action:
                if all(cond(context, kwargs) for cond in rule.conditions):
                    return True
        return False

    def execute_transition(self, current_state: str, action: str, context: Any, **kwargs) -> str:
        """
        Executes the transition, running hooks in the sequence:
        on_exit (old) -> on_transition -> on_enter (new).
        Returns the new state string.
        """
        rules = self.transitions.get(current_state, [])
        for rule in rules:
            if rule.name == action:
                if not all(cond(context, kwargs) for cond in rule.conditions):
                    raise StateMachineError(f"Conditions failed for transition {action}")

                old_state_obj = self.states.get(current_state)
                new_state_obj = self.states.get(rule.to_state)

                if old_state_obj and old_state_obj.on_exit:
                    old_state_obj.on_exit(context)

                if rule.on_transition:
                    rule.on_transition(context, kwargs)

                if new_state_obj and new_state_obj.on_enter:
                    new_state_obj.on_enter(context)

                return rule.to_state

        raise StateMachineError(f"No valid transition '{action}' from state '{current_state}'")
