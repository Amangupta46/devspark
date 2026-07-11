from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from .models import QuoteItem
from .services import PriceEngineService


@receiver([post_save, post_delete], sender=QuoteItem)
def trigger_quote_recalculation(sender, instance, **kwargs):
    if instance.quote:
        PriceEngineService.recalculate_quote_totals(instance.quote)
