from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import Repositorio


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class RepositorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repositorio
        fields = ['id', 'nome', 'descricao', 'criado_em', 'atualizado_em', 'criador', 'colaboradores']
        read_only_fields = ['criado_em', 'atualizado_em']
    
    def create(self, validated_data):
        colaboradores = validated_data.pop('colaboradores', [])
        repositorio = super().create(validated_data)
        repositorio.colaboradores.set(colaboradores)
        return repositorio
    
    def validate(self, data):
        # Garantir que o criador esteja incluído na lista de colaboradores
        criador = data.get('criador')
        colaboradores = data.get('colaboradores', [])
        
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
    
    