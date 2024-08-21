from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


# Create your models here.
class Repositorio(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    criador = models.ForeignKey(User, on_delete=models.CASCADE, related_name='repositorios_criados')
    colaboradores = models.ManyToManyField(User, related_name='repositorios')

    def __str__(self):
        return self.nome


class Video(models.Model):
    titulo = models.CharField(max_length=255)
    duracao = models.DurationField()
    arquivo = models.FileField(upload_to='videos/')
    repositorio = models.ForeignKey(Repositorio, on_delete=models.CASCADE, related_name='videos')
    data_publicacao = models.DateTimeField(auto_now_add=True)
    publicado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='videos_publicados')

    def __str__(self):
        return self.titulo


class Analise(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='analise')
    violencia_ocorreu = models.BooleanField(default=False)
    violencia_contra_mulher = models.BooleanField(default=False)
    duracao_violencia = models.DurationField(null=True, blank=True)
    comeco_violencia = models.TimeField(null=True, blank=True)
    final_violencia = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Análise de {self.video.name}"


class PublicadoEm(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE)  # Referência ao vídeo
    repositorio = models.ForeignKey(Repositorio, on_delete=models.CASCADE)  # Referência ao repositório
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Referência ao usuário que publicou

    class Meta:
        unique_together = ('video', 'repositorio')

    def __str__(self):
        return f"{self.video.name} publicado em {self.repositorio.name}"
