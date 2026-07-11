from typing import Optional

from django.core.exceptions import ObjectDoesNotExist

from .models import ActiveSession, CustomUser, Role


def get_user_by_email(email: str) -> Optional[CustomUser]:
    try:
        return CustomUser.objects.get(email=email)
    except ObjectDoesNotExist:
        return None


def get_user_by_id(user_id) -> Optional[CustomUser]:
    try:
        return CustomUser.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return None


def get_user_profile(user: CustomUser) -> dict:
    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "phone": user.phone,
        "profile_image": user.profile_image.url if user.profile_image else None,
        "company_name": user.company_name,
        "bio": user.bio,
        "roles": [role.name for role in user.roles.all()],
        "status": user.status,
    }


def get_active_sessions(user: CustomUser):
    """
    Returns active sessions for a user, sorted by newest.
    """
    return ActiveSession.objects.filter(user=user).order_by("-created_at")


def get_all_roles():
    return Role.objects.all()
