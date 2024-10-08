import os
import shutil
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound
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

    def update(self, request, *args, **kwargs):
        repo = self.get_object()
        data = request.data

        # Verificar se 'colaboradores' está no corpo da requisição
        colaboradores = data.get('colaboradores', [])
        if colaboradores:
            # Validar se 'colaboradores' é uma lista de IDs numéricos
            if not all(isinstance(id, int) for id in colaboradores):
                return Response({'error': 'Todos os colaboradores devem ser IDs numéricos.'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Atualizar a lista de colaboradores
            repo.colaboradores.set(colaboradores)
            repo.save()
            data.pop('colaboradores')  # Remove a chave colaboradores dos dados de update

        # Atualizar outras informações do repositório
        serializer = self.get_serializer(repo, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)



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


class VideoAPIView(generics.RetrieveAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Filtra usuários por nome de usuário
        username = self.request.query_params.get('username', None)
        if username:
            return User.objects.filter(username=username)
        return User.objects.none()


class ListVideosInRepositoryView(generics.ListAPIView):
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        repository_id = self.kwargs.get('repository_id')
        return Video.objects.filter(repositorio_id=repository_id)
    
class VideoDeleteView(generics.DestroyAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        # Obter o repositório a ser excluído
        video = self.get_object()
        # Excluir o video
        return super().delete(request, *args, **kwargs)
    
class MultipleVideoDeleteView(generics.GenericAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        video_ids = request.data.get('ids', [])
        if not video_ids:
            return Response({'error': 'No video IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Filtrar vídeos pelo IDs recebidos na requisição
        videos = Video.objects.filter(id__in=video_ids)

        # Excluir os arquivos de vídeo e suas pastas
        for video in videos:
            file_path = video.arquivo.path
            if os.path.isfile(file_path):
                os.remove(file_path)

        # Excluir os registros de vídeo do banco de dados
        videos.delete()

        return Response({'detail': 'Videos deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    
 
class VideoAnaliseView(generics.RetrieveAPIView):
    queryset = Analise.objects.all()
    serializer_class = AnaliseSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        video_id = self.kwargs.get('video_id')
        try:
            # Tenta recuperar a análise associada ao vídeo específico
            video = Video.objects.get(id=video_id)
            analise = Analise.objects.get(video=video)
        except Video.DoesNotExist:
            raise NotFound(detail="Vídeo não encontrado.")
        except Analise.DoesNotExist:
            raise NotFound(detail="Análise não encontrada para o vídeo fornecido.")
        
        return analise

