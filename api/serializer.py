from rest_framework import serializers
from .models import AgendarClase, DatosFisicos, Usuario

class agendarClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendarClase
        fields = '__all__'


class datosFisicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosFisicos
        fields = '__all__'


class usuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'