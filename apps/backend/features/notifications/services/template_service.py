from django.template import Context, Template

from features.notifications.models import MessageTemplate


class TemplateService:
    """
    Handles fetching and rendering templates with context variables.
    """

    @staticmethod
    def render(template_name: str, channel: str, language: str, context_dict: dict) -> dict:
        try:
            template_obj = MessageTemplate.objects.get(
                name=template_name, channel=channel, language=language, is_active=True
            )
        except MessageTemplate.DoesNotExist:
            # Fallback to English or default empty
            return {"title": "Notification", "body": "You have a new notification."}

        context = Context(context_dict)

        # Render Subject (if applicable)
        rendered_title = ""
        if template_obj.subject_template:
            django_title = Template(template_obj.subject_template)
            rendered_title = django_title.render(context)

        # Render Body
        django_body = Template(template_obj.body_template)
        rendered_body = django_body.render(context)

        return {"title": rendered_title, "body": rendered_body}

    @staticmethod
    def preview(subject_template: str, body_template: str, context_dict: dict) -> dict:
        context = Context(context_dict)
        rendered_title = ""
        if subject_template:
            rendered_title = Template(subject_template).render(context)

        rendered_body = Template(body_template).render(context)
        return {"title": rendered_title, "body": rendered_body}


template_service = TemplateService()
