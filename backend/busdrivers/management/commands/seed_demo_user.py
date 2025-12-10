from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """A custom management command to create a demo user."""
    help = 'Creates a demo user for the application if it does not already exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        username = 'demo@busdriver.com'
        password = 'demopassword'

        if not User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(
                f"Demo user '{username}' not found, creating it."
            ))
            User.objects.create_user(
                username=username, email=username, password=password
            )
        else:
            self.stdout.write(self.style.SUCCESS(
                f"Demo user '{username}' already exists, skipping creation."
            ))
