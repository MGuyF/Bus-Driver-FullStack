from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    """A custom management command to create a demo user."""
    help = 'Creates a demo user for the application if it does not already exist.'

    def handle(self, *args, **options):
        User = get_user_model()
        username = 'demo@busdriver.com'
        password = 'Demo123456&78'

        try:
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(
                f"Demo user '{username}' already exists. Password has been updated."
            ))
        except User.DoesNotExist:
            User.objects.create_user(
                username=username, email=username, password=password
            )
            self.stdout.write(self.style.SUCCESS(
                f"Demo user '{username}' created successfully."
            ))
