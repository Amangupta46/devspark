from .processing import ImageOptimizerInterface, ThumbnailGeneratorInterface
from .security import ScanResult, VirusScannerInterface
from .storage import StorageBackend, StorageProvider

__all__ = [
    "StorageBackend",
    "StorageProvider",
    "VirusScannerInterface",
    "ScanResult",
    "ImageOptimizerInterface",
    "ThumbnailGeneratorInterface",
]
