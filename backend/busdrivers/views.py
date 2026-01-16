from rest_framework import viewsets, status, filters
from .models import BusDriver, Tour
from .serializers import BusDriverSerializer, TourSerializer, UserRegistrationSerializer, MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model

class BusDriverViewSet(viewsets.ModelViewSet):
    queryset = BusDriver.objects.all()
    serializer_class = BusDriverSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['full_name', 'email', 'phone', 'address', 'bus_number', 'company_name']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.all()
    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['bus_driver__full_name', 'start_time', 'start_location', 'destination', 'status']

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegistrationView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'detail': 'Utilisateur créé avec succès.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
