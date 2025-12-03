from rest_framework import serializers
from .models import AgendarClase, DatosFisicos, Registro, Coach, Membresia

class agendarClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgendarClase
        fields = '__all__'


class datosFisicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosFisicos
        fields = '__all__'


class registroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = '__all__'

class coachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'

class membresiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membresia
        fields = '__all__'