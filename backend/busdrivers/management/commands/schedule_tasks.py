from django.core.management.base import BaseCommand
from django_q.models import Schedule

class Command(BaseCommand):
    help = 'Schedules the periodic cleanup task for demo data.'

    def handle(self, *args, **options):
        task_name = 'busdrivers.tasks.cleanup_demo_data'

        if not Schedule.objects.filter(func=task_name).exists():
            Schedule.objects.create(
                func=task_name,
                schedule_type=Schedule.MINUTES,
                minutes=30,  # Run every 30 minutes
                repeats=-1,  # Repeat indefinitely
            )
            self.stdout.write(self.style.SUCCESS(
                f'Successfully scheduled task: {task_name}'
            ))
        else:
            self.stdout.write(self.style.WARNING(
                f'Task {task_name} is already scheduled.'
            ))
