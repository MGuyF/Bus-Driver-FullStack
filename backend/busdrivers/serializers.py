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


from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        # We expect 'email' and 'password' in the request data
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # We use Django's authenticate function. 
            # This will call your EmailOrUsernameBackend behind the scenes.
            user = authenticate(request=self.context.get('request'),
                                username=email, password=password)

            if not user:
                raise serializers.ValidationError('No active account found with the given credentials')

            # If authentication is successful, we generate the tokens
            refresh = self.get_token(user)

            data = {}
            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            # You can add extra data here if you want
            data['user'] = {
                'id': user.id,
                'email': user.email,
                'username': user.username
            }

            return data
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
