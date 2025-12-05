from django.db import models

from django.db import models

class Tour(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    bus_driver = models.ForeignKey('BusDriver', related_name='tours', on_delete=models.CASCADE)
    tour_date = models.DateField()
    start_time = models.TimeField()
    arrival_time = models.TimeField()
    start_location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')

    def __str__(self):
        return f"Tour for {self.bus_driver.fullName} on {self.tour_date}"

class BusDriver(models.Model):
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255)
    birth_date = models.DateField()
    license_number = models.CharField(max_length=50)
    license_expiry = models.DateField()
    bus_number = models.CharField(max_length=20)
    company_name = models.CharField(max_length=100)
    bus_type = models.CharField(max_length=50)
    experience_years = models.PositiveIntegerField()
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.full_name} ({self.bus_number})"
