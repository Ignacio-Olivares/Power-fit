from django.shortcuts import render
from .serializer import agendarClaseSerializer, datosFisicosSerializer, registroSerializer, coachSerializer
from .models import AgendarClase, DatosFisicos, Registro, Coach
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
@api_view(['GET', 'POST'])
def agendarClase_list(request):
    if request.method == 'GET':
        clases = AgendarClase.objects.all()
        serializer = agendarClaseSerializer(clases, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = agendarClaseSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
def datosFisicos_list(request):
    if request.method == 'GET':
        datos = DatosFisicos.objects.all()
        serializer = datosFisicosSerializer(datos, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = datosFisicosSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST', 'PATCH'])
def registro_list(request):
    if request.method == 'GET':
        registros = Registro.objects.all()
        serializer = registroSerializer(registros, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = registroSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'PATCH':
        user_id = request.data.get("id")
        if not user_id:
            return Response({"error": "Debe enviar id del usuario"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            registro = Registro.objects.get(id=user_id)
        except Registro.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = registroSerializer(registro, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'POST'])
def coach_list(request):
    if request.method == 'GET':
        entrenador = Coach.objects.all()
        serializer = coachSerializer(entrenador, many=True)
        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = coachSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PATCH', 'DELETE'])
def coach_detail(request, pk):
    try:
        coach = Coach.objects.get(pk=pk)
    except Coach.DoesNotExist:
        return Response({"error": "Coach no encontrado"}, status=404)

    if request.method == 'GET':
        serializer = coachSerializer(coach)
        return Response(serializer.data)

    if request.method == 'PATCH':
        serializer = coachSerializer(coach, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        coach.delete()
        return Response({"mensaje": "Coach eliminado"}, status=204)
