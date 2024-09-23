import random
import requests
from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from moviepy.editor import VideoFileClip
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
from datetime import timedelta
import os

def upload_to(instance, filename):
    filename = os.path.basename(filename)
    return os.path.join(str(instance.repositorio.id), filename)


def thumbnail_upload_to(instance, filename):
    filename = os.path.basename(filename)
    # Armazena thumbnails na pasta 'thumbnails' dentro da pasta do repositório
    return os.path.join(str(instance.repositorio.id), 'thumbnails', filename)


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
    duracao = models.DurationField(blank=True, null=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    publicado_por = models.ForeignKey(User, on_delete=models.CASCADE, related_name='videos_publicados')
    thumbnail = models.ImageField(upload_to=thumbnail_upload_to, blank=True, null=True)

    def __str__(self):
        return self.titulo
    
    def save(self, *args, **kwargs):
        is_new = self.pk is None
        if is_new and self.arquivo:
            super().save(*args, **kwargs)  # Salva o objeto primeiro para garantir que `self.pk` esteja definido
            self.calculate_duration()
            self.generate_thumbnail()
            # self.create_analysis()  # Cria a análise automaticamente
            self.save()
        else:
            super().save(*args, **kwargs)


    def calculate_duration(self):
        video_path = self.arquivo.path

        if not os.path.isfile(video_path):
            raise IOError(f"MoviePy error: the file {video_path} could not be found!\n")

        clip = VideoFileClip(video_path)
        duration_seconds = clip.duration
        # Converter a duração de segundos para timedelta
        self.duracao = timedelta(seconds=duration_seconds)

    def generate_thumbnail(self):
        video_path = self.arquivo.path

        if not os.path.isfile(video_path):
            raise IOError(f"MoviePy error: the file {video_path} could not be found!\n")

        clip = VideoFileClip(video_path)
        frame = clip.get_frame(1)  # Extrair o frame de número 1

        image = Image.fromarray(frame)
        thumb_io = BytesIO()
        image.save(thumb_io, format='JPEG')

        # Gerar um nome único para a thumbnail
        filename = f'thumbnail_{self.pk}.jpg'

        # Salvar a imagem na pasta de thumbnails
        thumb_file = ContentFile(thumb_io.getvalue(), filename)
        self.thumbnail.save(filename, thumb_file, save=False)

    def create_analysis(self):
        # URL da API
        url = "http://ec2-54-219-26-123.us-west-1.compute.amazonaws.com/analyze/"

        # Path do video
        video_path = self.arquivo.path

        if not video_path.endswith('.avi'):
            raise IOError('Error: Only videos with the extension .avi are allowed.')
        
        elif os.path.getsize(video_path) > 50 * 1024 * 1024:
            raise IOError("Error: The video exceeds the maximum allowed size of 50MB.")
        
        else:
            try:
                # Abrir o arquivo de vídeo em modo binário
                with open(video_path, 'rb') as video_file:

                    # Payload do arquivo com o nome 'video'
                    files = {'video': video_file}
            
                    # Solicitação POST para a API
                    response = requests.post(url, files=files)
            
                    # Verificar se a solicitação foi bem-sucedida
                    response.raise_for_status()  # Levanta uma exceção se a resposta for um erro
            
                    # Processar a resposta da API 
                    response_data = response.json()
            
                    violencia_ocorreu = response_data.get('has_violence', False)
                    violencia_contra_mulher = response_data.get('has_woman', False)
                    duracao_violencia = sum(response_data.get('violence_seconds', []))  # Soma a duração total da violência
                    comeco_violencia = min(response_data.get('violence_seconds', [0]))  # Pega o primeiro segundo de violência
                    final_violencia = max(response_data.get('violence_seconds', [0]))  # Pega o último segundo de violência

                    # Criar a análise com os dados da API
                    Analise.objects.create(
                        video=self,
                        violencia_ocorreu=violencia_ocorreu,
                        violencia_contra_mulher=violencia_contra_mulher,
                        duracao_violencia=duracao_violencia,
                        comeco_violencia=comeco_violencia,
                        final_violencia=final_violencia
                    )

            except requests.exceptions.RequestException as e:
                raise IOError(f"Error to send video: {e}")


class Analise(models.Model):
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name='analise')
    violencia_ocorreu = models.BooleanField(default=False)
    violencia_contra_mulher = models.BooleanField(default=False)
    duracao_violencia = models.DurationField(null=True, blank=True)
    comeco_violencia = models.TimeField(null=True, blank=True)
    final_violencia = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f"Análise de {self.video}"

