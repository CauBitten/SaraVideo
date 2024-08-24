from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.text import slugify
import os

def upload_to(instance, filename):
    filename = os.path.basename(filename)
    return os.path.join(str(instance.repositorio.id), filename)


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
    repositorio = models.ForeignKey(Repositorio, related_name='videos', on_delete=models.CASCADE)
    titulo = models.CharField(max_length=255)
    arquivo = models.FileField(upload_to=upload_to)
    duracao = models.DurationField()
    criado_em = models.DateTimeField(auto_now_add=True)
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
        return f"Análise de {self.video}"

