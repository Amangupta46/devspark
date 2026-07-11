from rest_framework.permissions import BasePermission


class HasRole(BasePermission):
    """
    Allows access only to users with a specific role.
    Usage: `permission_classes = [HasRole('Admin')]`
    Note: Dynamic arguments in DRF permissions require custom factory functions
    or evaluating roles inside the view. For simplicity, we create specific role classes below.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.roles.filter(name="Super Admin").exists()
        )


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.roles.filter(name="Admin").exists()
        )


class IsManager(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.roles.filter(name="Project Manager").exists()
        )


class IsDeveloper(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.roles.filter(name="Developer").exists()
        )


class IsClient(BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.roles.filter(name="Client").exists()
        )


def has_permission(user, permission_name: str) -> bool:
    """
    Helper function to check if a user has a specific atomic permission via their roles.
    """
    if user.is_superuser:
        return True
    return user.roles.filter(permissions__permission__name=permission_name).exists()
