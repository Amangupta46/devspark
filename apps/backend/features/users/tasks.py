from celery import shared_task


@shared_task
def send_welcome_email_task(user_id):
    # Retrieve user and send email using EmailTemplateService
    pass


@shared_task
def send_verification_email_task(user_id, token):
    # Send verification email
    pass


@shared_task
def send_password_reset_email_task(user_id, token):
    # Send password reset email
    pass


@shared_task
def delete_expired_tokens_task():
    # Cleanup expired active sessions and JWTs
    pass
