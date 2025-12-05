from rest_framework import serializers
from .models import BusDriver, Tour

class BusDriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusDriver
        fields = '__all__'

class TourSerializer(serializers.ModelSerializer):
    bus_driver_name = serializers.CharField(source='bus_driver.full_name', read_only=True)

    class Meta:
        model = Tour
        fields = '__all__'
