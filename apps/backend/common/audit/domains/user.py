from typing import Any, Dict, Optional

from ..service import AuditService


class UserAudit:
    """
    Standardized audit actions for the User / Auth domain.
    """

    DOMAIN = "user"

    @staticmethod
    def log_login(user_id: str, success: bool, details: Optional[Dict[str, Any]] = None):
        action = "LOGIN_SUCCESS" if success else "LOGIN_FAILED"
        AuditService.log_action(UserAudit.DOMAIN, user_id, action, changes=details, user_id=user_id)

    @staticmethod
    def log_role_change(user_id: str, old_role: str, new_role: str, admin_id: str):
        changes = {"role": {"old": old_role, "new": new_role}}
        AuditService.log_action(
            UserAudit.DOMAIN, user_id, "ROLE_CHANGED", changes=changes, user_id=admin_id
        )
