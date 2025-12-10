from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from .models import BusDriver

def cleanup_demo_data():
    """Deletes BusDriver records created by the demo user older than 30 minutes."""
    User = get_user_model()
    demo_username = 'demo@busdriver.com'

    try:
        demo_user = User.objects.get(username=demo_username)
    except User.DoesNotExist:
        print(f"Demo user '{demo_username}' not found. Skipping cleanup.")
        return

    cutoff_time = timezone.now() - timedelta(minutes=30)

    records_to_delete = BusDriver.objects.filter(
        created_by=demo_user,
        created_at__lt=cutoff_time
    )

    count, _ = records_to_delete.delete()

    if count > 0:
        print(f"Successfully deleted {count} old demo record(s).")
    else:
        print('No old demo records to delete.')
