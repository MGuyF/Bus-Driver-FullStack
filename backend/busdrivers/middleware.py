from datetime import timedelta
from django.utils import timezone
from django.core.cache import cache
from .tasks import schedule_cleanup

CACHE_KEY = 'last_cleanup_run'
CLEANUP_INTERVAL_MINUTES = 30

class DemoCleanupMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        last_run = cache.get(CACHE_KEY)

        if not last_run or (timezone.now() - last_run > timedelta(minutes=CLEANUP_INTERVAL_MINUTES)):
            cache.set(CACHE_KEY, timezone.now(), timeout=None)
            schedule_cleanup()

        response = self.get_response(request)
        return response
