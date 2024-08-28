import os
import shutil
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import (
    UserSerializer,
    RepositorioSerializer,
    CustomTokenObtainPairSerializer,
    VideoSerializer,
    AnaliseSerializer)
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Repositorio, Video, Analise
from rest_framework.response import Response


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


class ListUserRepositorioView(generics.ListAPIView):
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Repositorio.objects.filter(colaboradores=self.request.user)
    

class RepositorioDetailView(generics.RetrieveAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class RepositorioDeleteView(generics.DestroyAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        # Obter o repositório a ser excluído
        repository = self.get_object()
        
        # Obter todos os vídeos associados a este repositório
        videos = Video.objects.filter(repositorio=repository)
        
        # Excluir os arquivos de vídeo e suas pastas
        for video in videos:
            file_path = video.arquivo.path
            if os.path.isfile(file_path):
                os.remove(file_path)
        
        # Excluir os registros de vídeo do banco de dados
        videos.delete()
        
        # Excluir a pasta do repositório se ela existir
        repository_path = os.path.join(settings.MEDIA_ROOT, str(repository.id))
        if os.path.isdir(repository_path):
            shutil.rmtree(repository_path)
        
        # Excluir o repositório
        return super().delete(request, *args, **kwargs)
    

class RepositorioUpdateView(generics.UpdateAPIView):
    queryset = Repositorio.objects.all()
    serializer_class = RepositorioSerializer
    permission_classes = [IsAuthenticated]


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class VideoCreateView(generics.CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        repository_id = self.kwargs.get('repository_id')
        if repository_id:
            try:
                context['repository'] = Repositorio.objects.get(id=repository_id)
            except Repositorio.DoesNotExist:
                raise Response({"detail": "Repository not found."}, status=status.HTTP_404_NOT_FOUND)
        return context

    def post(self, request, *args, **kwargs):
        repository_id = self.kwargs.get('repository_id')
        if not repository_id:
            return Response({"detail": "Repository ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        return super().post(request, *args, **kwargs)


class VideoAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class ListVideosInRepositoryView(generics.ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        repository_id = self.kwargs.get('repository_id')
        return Video.objects.filter(repositorio_id=repository_id)