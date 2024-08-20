from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


# Create your models here.
class Repositorio(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True,
                                 null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    criador = models.ForeignKey(User,
                                on_delete=models.CASCADE,
                                related_name='repositorios_criados')
    colaboradores = models.ManyToManyField(User,
                                           related_name='repositorios')

    def __str__(self):
        return self.nome

