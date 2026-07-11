import uuid

from django.db import models
from django.utils import timezone


class SoftDeleteQuerySet(models.QuerySet):
    def alive(self):
        """Return only objects that haven't been soft deleted."""
        return self.filter(is_deleted=False)

    def dead(self):
        """Return only soft deleted objects."""
        return self.filter(is_deleted=True)

    def delete(self, soft=True):
        """Soft delete objects by default."""
        if soft:
            return super().update(is_deleted=True, updated_at=timezone.now())
        return super().delete()

    def hard_delete(self):
        """Permanently delete objects."""
        return super().delete()

    def restore(self):
        """Restore soft deleted objects."""
        return super().update(is_deleted=False, updated_at=timezone.now())


class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return SoftDeleteQuerySet(self.model, using=self._db)

    def alive(self):
        return self.get_queryset().alive()

    def dead(self):
        return self.get_queryset().dead()


class BaseModel(models.Model):
    """
    Abstract base model with UUID primary key, standard timestamps,
    and soft-delete functionality.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False, db_index=True)

    objects = SoftDeleteManager()
    all_objects = models.Manager()  # Includes soft-deleted records

    class Meta:
        abstract = True

    def delete(self, soft=True, *args, **kwargs):
        """Soft delete the instance by default."""
        if soft:
            self.is_deleted = True
            self.updated_at = timezone.now()
            self.save(update_fields=["is_deleted", "updated_at"])
        else:
            super().delete(*args, **kwargs)

    def hard_delete(self, *args, **kwargs):
        """Permanently delete the instance."""
        super().delete(*args, **kwargs)

    def restore(self):
        """Restore a soft-deleted instance."""
        self.is_deleted = False
        self.updated_at = timezone.now()
        self.save(update_fields=["is_deleted", "updated_at"])
