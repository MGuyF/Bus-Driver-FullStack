from django.shortcuts import render

from rest_framework import viewsets, status, filters
from .models import BusDriver, Tour
from .serializers import BusDriverSerializer, TourSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class BusDriverViewSet(viewsets.ModelViewSet):
    queryset = BusDriver.objects.all()
    serializer_class = BusDriverSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'email', 'phone', 'address', 'bus_number', 'company_name']

class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['bus_driver__full_name', 'start_time', 'start_location', 'destination', 'status']

class CustomLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if email == 'test@busdriver.com' and password == 'password123':
            user = {
                'email': 'test@busdriver.com',
                'name': 'John Doe'
            }
            return Response({'user': user}, status=status.HTTP_200_OK)
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
