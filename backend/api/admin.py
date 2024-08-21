from django.contrib import admin

from models import Repositorio, Video, PublicadoEm, Analise


@admin.register(Repositorio)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = {'nome', 'descricao', 'criado_em', 'atualizado_em', 'criador', 'colaboradores'}


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = {'titulo', 'duracao', 'arquivo', 'repositorio', 'publicado_por', 'data_publicacao'}


@admin.register(PublicadoEm)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = {'video', 'repositorio', 'user'}


@admin.register(Analise)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = {'video', 'violencia_ocorreu', 'violencia_contra_mulher', 'duracao_violencia',
                    'comeco_violencia', 'final_violencia'}


@admin.register(Repositorio)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = {'nome', 'descricao', 'criado_em', 'atualizado_em', 'criador', 'colaboradores'}
