from ..service import AuditService


class ProjectAudit:
    DOMAIN = "project"

    @staticmethod
    def log_task_assigned(task_id: str, old_assignee: str, new_assignee: str):
        changes = {"assignee": {"old": old_assignee, "new": new_assignee}}
        AuditService.log_action("task", task_id, "ASSIGNED", changes=changes)

    @staticmethod
    def log_project_status_changed(project_id: str, old_status: str, new_status: str):
        changes = {"status": {"old": old_status, "new": new_status}}
        AuditService.log_action("project", project_id, "STATUS_CHANGED", changes=changes)
