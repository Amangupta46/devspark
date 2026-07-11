from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import BinaryIO


@dataclass
class ScanResult:
    is_clean: bool
    details: str = ""


class VirusScannerInterface(ABC):
    """
    Interface for integrating third-party virus scanning services (e.g., ClamAV).
    """

    @abstractmethod
    def scan(self, file_stream: BinaryIO) -> ScanResult:
        """
        Scans a file stream for malware/viruses.
        """
        pass
