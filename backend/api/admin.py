from django.contrib import admin

from .models import Repositorio, Video, Analise


@admin.register(Repositorio)
class RepositorioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'descricao', 'criado_em', 'atualizado_em', 'criador')


@admin.register(Analise)
class AnaliseAdmin(admin.ModelAdmin):
    list_display = ('video', 'violencia_ocorreu', 'violencia_contra_mulher', 'duracao_violencia',
                    'comeco_violencia', 'final_violencia')
