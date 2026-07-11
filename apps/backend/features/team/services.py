from django.db import transaction
from django.db.models import Sum

from features.projects.models import ProjectTask

from .models import (
    CalendarEvent,
    CodeReviewRequest,
    Conversation,
    LeaveRequest,
    Message,
    TeamMember,
)


class ResourcePlannerService:
    @staticmethod
    def calculate_member_capacity(member: TeamMember, start_date, end_date):
        """
        Calculates Available, Reserved, Booked, Leave, Meetings and Remaining Capacity for a given date range.
        """
        days = (end_date - start_date).days + 1
        weeks = days / 7.0

        # Base availability
        total_available_hours = float(member.available_hours_per_week) * weeks

        # Leaves
        leaves = LeaveRequest.objects.filter(
            member=member, status="approved", start_date__lte=end_date, end_date__gte=start_date
        )
        leave_days = sum([min((l.end_date - l.start_date).days + 1, days) for l in leaves])
        leave_hours_deduction = leave_days * 8.0  # Rough conversion

        # Meetings
        meetings = CalendarEvent.objects.filter(
            attendees=member,
            event_type="meeting",
            start_time__date__lte=end_date,
            start_time__date__gte=start_date,
        )
        meeting_hours = sum(
            [(m.end_time - m.start_time).total_seconds() / 3600.0 for m in meetings]
        )

        # Booked Project Tasks
        tasks = ProjectTask.objects.filter(
            assigned_to=member.user,
            status__in=["todo", "in_progress", "code_review", "testing"],
            deadline__date__lte=end_date,
            deadline__date__gte=start_date,
        )
        booked_task_hours = tasks.aggregate(total=Sum("estimated_hours"))["total"] or 0.0

        # Remaining capacity
        remaining = (
            total_available_hours - leave_hours_deduction - meeting_hours - float(booked_task_hours)
        )
        is_overloaded = remaining < 0

        return {
            "total_available_hours": round(total_available_hours, 2),
            "leave_hours_deduction": round(leave_hours_deduction, 2),
            "meeting_hours": round(meeting_hours, 2),
            "booked_task_hours": round(float(booked_task_hours), 2),
            "remaining_capacity": round(remaining, 2),
            "is_overloaded": is_overloaded,
        }


class ResourceRecommendationService:
    @staticmethod
    def get_best_candidates(required_skill: str, start_date, end_date):
        """
        Returns a sorted list of TeamMembers based on Skill Proficiency and Capacity.
        """
        candidates = TeamMember.objects.filter(skills__skill_name__iexact=required_skill)

        scored_candidates = []
        for candidate in candidates:
            skill = candidate.skills.get(skill_name__iexact=required_skill)
            capacity_data = ResourcePlannerService.calculate_member_capacity(
                candidate, start_date, end_date
            )

            # Simple heuristic score: (Proficiency * 10) + Remaining Capacity Hours
            score = (skill.proficiency_level * 10) + capacity_data["remaining_capacity"]

            # Penalty for overload
            if capacity_data["is_overloaded"]:
                score -= 100

            scored_candidates.append(
                {
                    "member_id": candidate.id,
                    "email": candidate.user.email,
                    "proficiency": skill.proficiency_level,
                    "remaining_capacity": capacity_data["remaining_capacity"],
                    "score": round(score, 2),
                }
            )

        scored_candidates.sort(key=lambda x: x["score"], reverse=True)
        return scored_candidates


class LeaveManagementService:
    @staticmethod
    @transaction.atomic
    def process_leave_request(leave_request: LeaveRequest, action: str, manager: TeamMember):
        if action == "approve":
            leave_request.status = "approved"
            # Also auto-create a Calendar Event
            CalendarEvent.objects.create(
                organization=leave_request.member.organization,
                title=f"Leave: {leave_request.member.user.email}",
                event_type="leave",
                start_time=leave_request.start_date,
                end_time=leave_request.end_date,
            ).attendees.add(leave_request.member)

        elif action == "reject":
            leave_request.status = "rejected"

        leave_request.approved_by = manager
        leave_request.save(update_fields=["status", "approved_by"])
        return leave_request


class CodeReviewService:
    @staticmethod
    @transaction.atomic
    def update_review_status(review: CodeReviewRequest, status: str):
        review.status = status
        review.save(update_fields=["status"])

        if status == "approved":
            task = review.task
            task.status = "testing"
            task.save(update_fields=["status"])

        return review


class TeamChatService:
    @staticmethod
    @transaction.atomic
    def send_message(sender: TeamMember, conversation: Conversation, content: str):
        message = Message.objects.create(conversation=conversation, sender=sender, content=content)
        return message
