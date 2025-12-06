import os
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """A custom management command to create a superuser if one doesn't exist."""
    help = 'Creates a superuser from environment variables if not already present.'

    def handle(self, *args, **options):
        User = get_user_model()
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not all([username, email, password]):
            self.stdout.write(self.style.WARNING(
                'Skipping superuser creation: Missing DJANGO_SUPERUSER environment variables.'
            ))
            return

        if not User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(
                f"Superuser '{username}' not found, creating it."
            ))
            User.objects.create_superuser(
                username=username, email=email, password=password
            )
        else:
            self.stdout.write(self.style.SUCCESS(
                f"Superuser '{username}' already exists, skipping creation."
            ))
