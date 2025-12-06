from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to the token
        token['username'] = user.username
        token['email'] = user.email

        return token
