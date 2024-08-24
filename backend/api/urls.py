from django.urls import path

from rest_framework.routers import SimpleRouter

from .views import CreateUserView, CreateRepositorioView, CustomTokenObtainPairView, ListUserRepositorioView, RepositorioDetailView, VideoCreateView, RepositorioDeleteView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('repositorio/create/', CreateRepositorioView.as_view(), name="create-repo"),
    path('user/register/', CreateUserView.as_view(), name="register"),
    path('token/', CustomTokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('repositorios-list/', ListUserRepositorioView.as_view(), name="repositorios-list"),
    path('repositorios/<int:id>/', RepositorioDetailView.as_view(), name="repositorio-detail"),
    path('repositorios/<int:repository_id>/upload/', VideoCreateView.as_view(), name="upload-video"),
    path('repositorios/<int:pk>/delete/', RepositorioDeleteView.as_view(), name='repositorio-delete'),
]