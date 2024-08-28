from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import Repositorio, Analise, Video


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        original_username = instance.username

        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        
        if 'username' in validated_data and validated_data['username'] != original_username:
            instance.username = original_username

        instance.save()
        return instance


class RepositorioSerializer(serializers.ModelSerializer):
    colaboradores = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    
    class Meta:
        model = Repositorio
        fields = ['id', 'nome', 'descricao', 'criado_em', 'atualizado_em', 'criador', 'colaboradores']
        read_only_fields = ['criado_em', 'atualizado_em', 'criador']

    def create(self, validated_data):
        colaboradores = validated_data.pop('colaboradores', [])
        repositorio = super().create(validated_data)
        if colaboradores:
            repositorio.colaboradores.set(colaboradores)
        return repositorio

    def validate(self, data):
        criador = self.context['request'].user
        colaboradores = data.get('colaboradores', [])

        # Garantir que o criador esteja incluído na lista de colaboradores
        if criador and criador not in colaboradores:
            colaboradores.append(criador)
        
        data['colaboradores'] = colaboradores
        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError('Invalid credentials')

        # Gera o token para o usuário autenticado
        data = super().validate(attrs)
        return data


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'repositorio', 'titulo', 'arquivo', 'duracao', 'criado_em', 'publicado_por', 'thumbnail']
        read_only_fields = ['criado_em', 'publicado_por', 'repositorio', 'thumbnail']

    def create(self, validated_data):
        request = self.context.get('request')
        repository = self.context.get('repository')
        
        if request is not None:
            validated_data['publicado_por'] = request.user

        if repository is not None:
            validated_data['repositorio'] = repository

        return super().create(validated_data)

class AnaliseSerializer(serializers.ModelSerializer):
    video = VideoSerializer(read_only=True)

    class Meta:
        model = Analise
        fields = ['id', 'video', 'violencia_ocorreu', 'violencia_contra_mulher', 'duracao_violencia',
                  'comeco_violencia', 'final_violencia']

