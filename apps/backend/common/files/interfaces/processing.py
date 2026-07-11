from abc import ABC, abstractmethod
from typing import BinaryIO


class ImageOptimizerInterface(ABC):
    """
    Interface for optimizing images to reduce size without quality loss.
    """

    @abstractmethod
    def optimize(self, file_stream: BinaryIO, **kwargs) -> BinaryIO:
        """
        Optimizes the provided image stream.
        """
        pass


class ThumbnailGeneratorInterface(ABC):
    """
    Interface for generating thumbnails from images or videos.
    """

    @abstractmethod
    def generate_thumbnail(self, file_stream: BinaryIO, size: tuple = (128, 128)) -> BinaryIO:
        """
        Generates and returns a thumbnail as a binary stream.
        """
        pass
