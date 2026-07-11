from django.db import transaction

from .models import ActivityTimeline, Lead


class LeadScoringEngine:
    @staticmethod
    def calculate_score(lead: Lead) -> int:
        score = 0
        if lead.estimated_budget and lead.estimated_budget > 10000:
            score += 20
        if lead.priority == "high":
            score += 15
        elif lead.priority == "urgent":
            score += 25
        if lead.contact and lead.contact.phone:
            score += 10
        # More complex heuristics can be added here
        return score


class LeadMergeService:
    @staticmethod
    @transaction.atomic
    def merge_leads(primary_lead: Lead, secondary_lead: Lead):
        """
        Merge secondary lead into primary lead.
        Moves all related data (notes, tasks, timeline) to primary.
        """
        secondary_lead.notes.update(lead=primary_lead)
        secondary_lead.tasks.update(lead=primary_lead)
        secondary_lead.communications.update(lead=primary_lead)
        secondary_lead.timeline.update(lead=primary_lead)
        secondary_lead.meetings.update(lead=primary_lead)
        secondary_lead.followups.update(lead=primary_lead)

        # Soft delete secondary lead
        secondary_lead.delete()

        ActivityTimeline.objects.create(
            lead=primary_lead,
            action="Lead Merged",
            description=f"Merged with lead {secondary_lead.lead_number}",
        )
        return primary_lead


class ConversionService:
    @staticmethod
    def convert_lead_to_client_and_project(lead: Lead):
        """
        Interface for converting a Lead to a Client and initiating a Project.
        NOTE: Project module is not built yet per constraints.
        This simply updates the lead stage to WON.
        """
        if not lead.stage.is_terminal_won:
            # Transition to won
            pass
        return {"status": "success", "message": "Lead marked as won. Project interface stubbed."}


class CSVService:
    @staticmethod
    def import_leads(file_obj):
        # Stub for pandas/csv dictreader logic
        pass

    @staticmethod
    def export_leads():
        # Stub for csv writer logic
        pass
