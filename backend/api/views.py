from django.contrib.auth.models import User
from rest_framework import generics, viewsets
from .serializers import (
    UserSerializer,
    RepositorioSerializer,
    CustomTokenObtainPairSerializer,
    VideoSerializer,
    AnaliseSerializer,
    PublicadoEmSerializer)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Repositorio, Video, Analise, PublicadoEm


# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CreateRepositorioView(generics.CreateAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Salva o repositório com o criador
        repositorio = serializer.save(criador=self.request.user)
        
        # Adiciona o criador à lista de colaboradores
        repositorio.colaboradores.add(self.request.user)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# Video views

class VideosAPIView(generics.ListCreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class VideoAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


