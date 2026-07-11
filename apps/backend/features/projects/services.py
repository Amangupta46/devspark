from django.db import transaction
from django.db.models import Sum

from .models import Milestone, Project, ProjectPhase, ProjectTask


class ProjectConversionService:
    @staticmethod
    @transaction.atomic
    def scaffold_from_quote(quote):
        """
        Receives an accepted Quote from the CPQ engine and creates a Project.
        """
        # Create root project
        project = Project.objects.create(
            project_id=f"PRJ-{quote.quote_number}",
            project_code=f"PRJ-{quote.id}",
            name=f"Project for {quote.lead.title if quote.lead else 'Unknown'}",
            client=quote.company,
            lead=quote.lead,
            accepted_quote=quote,
            proposal=getattr(quote, "proposal", None),
            budget=quote.grand_total,
            status="planning",
        )

        # Scaffold default phase
        phase = ProjectPhase.objects.create(project=project, name="Initial Execution", order=1)

        # Scaffold milestone based on Quote items
        for idx, item in enumerate(quote.items.all()):
            milestone = Milestone.objects.create(
                phase=phase,
                name=f"Deliverable: {item.custom_name or item.service.name}",
                order=idx + 1,
            )
            # Create a task for each item
            ProjectTask.objects.create(
                project=project,
                milestone=milestone,
                title=f"Implement {item.custom_name or item.service.name}",
                kanban_order=idx,
            )

        return project


class KanbanOrderingService:
    @staticmethod
    @transaction.atomic
    def reorder_task(task_id: str, new_status: str, new_kanban_order: int):
        task = ProjectTask.objects.get(id=task_id)
        task.status = new_status
        task.kanban_order = new_kanban_order
        task.save(update_fields=["status", "kanban_order"])
        return task


class TimeTrackingService:
    @staticmethod
    @transaction.atomic
    def sync_actual_hours(task: ProjectTask):
        """
        Aggregates TimeLogs for a task and updates the task and parent project.
        """
        total_logged = task.time_logs.aggregate(total=Sum("hours_logged"))["total"] or 0
        task.actual_hours = total_logged
        task.save(update_fields=["actual_hours"])

        project = task.project
        project_actual = project.tasks.aggregate(total=Sum("actual_hours"))["total"] or 0
        project.actual_hours = project_actual

        # Optional: compute simple completion % based on hours or task counts
        total_tasks = project.tasks.count()
        completed_tasks = project.tasks.filter(status="completed").count()
        if total_tasks > 0:
            project.completion_percentage = int((completed_tasks / total_tasks) * 100)

        project.save(update_fields=["actual_hours", "completion_percentage"])


class FutureInvoiceConversionService:
    @staticmethod
    def create_invoice_from_project(project: Project):
        """
        Stub for future billing/invoicing module.
        """
        return {"status": "success", "message": "Future invoicing triggered."}
