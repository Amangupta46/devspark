from dataclasses import dataclass, field
from typing import List

from .statemachine import State, StateMachine, TransitionRule


@dataclass
class WorkflowDefinition:
    """
    A blueprint outlining the steps and transitions for a specific business process.
    """

    id: str
    name: str
    states: List[State] = field(default_factory=list)
    transitions: List[TransitionRule] = field(default_factory=list)
    initial_state: str = ""

    def build_machine(self) -> StateMachine:
        machine = StateMachine()
        for s in self.states:
            machine.add_state(s)
            if s.is_initial:
                self.initial_state = s.name
        for t in self.transitions:
            machine.add_transition(t)
        return machine
