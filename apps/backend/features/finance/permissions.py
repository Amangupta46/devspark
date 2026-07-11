from rest_framework.permissions import BasePermission


class IsFinanceAdmin(BasePermission):
    """
    Allows access only to users with the 'Finance Admin' role.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and hasattr(request.user, "role")
            and request.user.role == "finance_admin"
        )


class IsAccountant(BasePermission):
    """
    Allows access only to users with the 'Accountant' role.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and hasattr(request.user, "role")
            and request.user.role in ["finance_admin", "accountant"]
        )


class IsFinanceManager(BasePermission):
    """
    Allows access only to users with the 'Finance Manager' role.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and hasattr(request.user, "role")
            and request.user.role in ["finance_admin", "manager"]
        )


class IsFinanceReadOnly(BasePermission):
    """
    Allows read-only access to users with basic finance viewer permissions.
    """

    def has_permission(self, request, view):
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            return bool(request.user and request.user.is_authenticated)
        return False


class CanApproveInvoice(BasePermission):
    """
    Allows access to users who can approve invoices.
    """

    def has_permission(self, request, view):
        # Can be Finance Admin, Manager or explicit permission
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                hasattr(request.user, "role")
                and request.user.role in ["finance_admin", "manager"]
                or request.user.has_perm("finance.can_approve_invoice")
            )
        )


class CanIssueCreditNote(BasePermission):
    """
    Allows access to users who can issue credit notes.
    """

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (
                hasattr(request.user, "role")
                and request.user.role == "finance_admin"
                or request.user.has_perm("finance.can_issue_credit_note")
            )
        )
