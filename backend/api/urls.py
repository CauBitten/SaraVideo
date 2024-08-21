from django.urls import path

from rest_framework.routers import SimpleRouter

from .views import CreateUserView, CreateRepositorioView, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/repositorio/create/', CreateRepositorioView.as_view(), name="create-repo"),
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', CustomTokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
]