from celery import shared_task
import time

@shared_task
def add(x, y):
    time.sleep(1)
    return x + y
