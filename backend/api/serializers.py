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
    criador = serializers.ReadOnlyField(source='criador.username')
    usuarios = serializers.SlugRelatedField(
        many=True,
        queryset=User.objects.all(),
        slug_field='username'
    )

    class Meta:
        model = Repositorio
        fields = '__all__'


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
    
    