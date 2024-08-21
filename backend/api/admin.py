from django.contrib import admin

from .models import Repositorio, Video, PublicadoEm, Analise


@admin.register(Repositorio)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao')  # Certifique-se de que está entre parênteses


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'repositorio', 'data_publicacao')


@admin.register(Analise)
class AnaliseAdmin(admin.ModelAdmin):
    list_display = ('video', 'resultado', 'data_analise')


@admin.register(PublicadoEm)
class PublicadoEmAdmin(admin.ModelAdmin):
    list_display = ('repositorio', 'video', 'data_publicacao')