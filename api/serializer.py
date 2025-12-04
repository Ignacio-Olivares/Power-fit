from rest_framework import serializers
from .models import AgendarClase, DatosFisicos, Registro, Coach, Membresia, NuevoCoach, ClaseProgramada

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

class nuevoCoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = NuevoCoach
        fields = '__all__'

class claseProgramadaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClaseProgramada
        fields = '__all__'