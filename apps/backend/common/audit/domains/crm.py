from ..service import AuditService


class CRMAudit:
    DOMAIN = "crm"

    @staticmethod
    def log_contact_created(contact_id: str, email: str):
        changes = {"email": {"new": email}}
        AuditService.log_action("contact", contact_id, "CREATED", changes=changes)

    @staticmethod
    def log_deal_stage_changed(deal_id: str, old_stage: str, new_stage: str):
        changes = {"stage": {"old": old_stage, "new": new_stage}}
        AuditService.log_action("deal", deal_id, "STAGE_CHANGED", changes=changes)
