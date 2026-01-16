from rest_framework import routers
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import BusDriverViewSet, TourViewSet, CustomLoginView, MyTokenObtainPairView, RegistrationView

router = DefaultRouter()
router.register(r'busdrivers', BusDriverViewSet)
router.register(r'tours', TourViewSet)

urlpatterns = [
    path('auth/register/', RegistrationView.as_view(), name='register'),
    path('auth/custom-login/', CustomLoginView.as_view(), name='custom_login'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
]
