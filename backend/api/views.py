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


