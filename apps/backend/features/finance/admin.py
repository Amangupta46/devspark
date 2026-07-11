from django.contrib import admin

from .models.accounting import ChartOfAccounts, JournalEntry, JournalEntryLine, Ledger
from .models.core import Coupon, Currency, PaymentGatewayConfig, PaymentMethod, Tax
from .models.expense import ExpenseCategory, Vendor

# Core
admin.site.register(Currency)
admin.site.register(Tax)
admin.site.register(Coupon)
admin.site.register(PaymentMethod)
admin.site.register(PaymentGatewayConfig)

# Expenses
admin.site.register(Vendor)
admin.site.register(ExpenseCategory)


# Accounting
class JournalEntryLineInline(admin.TabularInline):
    model = JournalEntryLine
    extra = 2


@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "ledger", "status")
    inlines = [JournalEntryLineInline]


admin.site.register(ChartOfAccounts)
admin.site.register(Ledger)
