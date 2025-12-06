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


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

    def validate(self, attrs):
        # This will use your custom backend to authenticate with email or username
        data = super().validate(attrs)

        # Add custom data to the response if needed
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['username'] = self.user.username

        return data
