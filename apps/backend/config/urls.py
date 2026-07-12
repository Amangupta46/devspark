from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


def health_check(request):
    return JsonResponse({"status": "ok"})


def ready_check(request):
    # In a real setup, check DB connection here
    return JsonResponse({"status": "ready"})


def live_check(request):
    return JsonResponse({"status": "live"})


urlpatterns = [
    path("admin/", admin.site.urls),
    # API endpoints
    path("api/v1/users/", include("features.users.urls")),
    path("api/v1/crm/", include("features.crm.api.urls")),
    path("api/v1/quotes/", include("features.quotes.api.urls")),
    path("api/v1/projects/", include("features.projects.api.urls")),
    path("api/v1/team/", include("features.team.api.urls")),
    path("api/v1/client-portal/", include("features.client_portal.api.urls")),
    path("api/notifications/", include("features.notifications.api.urls")),
    # Health checks
    path("health/", health_check, name="health_check"),
    path("ready/", ready_check, name="ready_check"),
    path("live/", live_check, name="live_check"),
    # Swagger / OpenAPI
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
