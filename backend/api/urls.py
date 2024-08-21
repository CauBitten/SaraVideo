from django.urls import path

from rest_framework.routers import SimpleRouter

from .views import CreateUserView, CreateRepositorioView, CustomTokenObtainPairView, VideoAPIView, VideosAPIView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('repositorio/create/', CreateRepositorioView.as_view(), name="create-repo"),
    path('user/register/', CreateUserView.as_view(), name="register"),
    path('token/', CustomTokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('videos/<int : pk>', VideoAPIView.as_view(), name="videos"),
    path('video/', VideosAPIView.as_view(), name="video"),
]