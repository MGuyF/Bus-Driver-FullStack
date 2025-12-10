import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from busdrivers.models import BusDriver

class Command(BaseCommand):
    """A custom management command to clean up old data created by the demo user."""
    help = 'Deletes BusDriver records created by the demo user older than 30 minutes.'

    def handle(self, *args, **options):
        User = get_user_model()
        demo_username = 'demo@busdriver.com'

        try:
            demo_user = User.objects.get(username=demo_username)
        except User.DoesNotExist:
            self.stdout.write(self.style.WARNING(
                f"Demo user '{demo_username}' not found. Skipping cleanup."
            ))
            return

        # Define the cutoff time for deletion (30 minutes ago)
        cutoff_time = timezone.now() - timedelta(minutes=30)

        # Find and delete old BusDriver records
        records_to_delete = BusDriver.objects.filter(
            created_by=demo_user,
            created_at__lt=cutoff_time
        )

        count, _ = records_to_delete.delete()

        if count > 0:
            self.stdout.write(self.style.SUCCESS(
                f"Successfully deleted {count} old demo record(s)."
            ))
        else:
            self.stdout.write(self.style.SUCCESS(
                'No old demo records to delete.'
            ))
