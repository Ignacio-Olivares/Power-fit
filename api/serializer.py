from rest_framework import serializers
from .models import AgendarClase, DatosFisicos, Registro, Coach, Membresia, NuevoCoach, ClaseProgramada, Pago, Asistencia

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

class pagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class AsistenciaSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    usuario_apellido = serializers.CharField(source='usuario.apellido', read_only=True)

    class Meta:
        model = Asistencia
        fields = '__all__'