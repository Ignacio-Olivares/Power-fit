from django.shortcuts import render
from .serializer import agendarClaseSerializer, datosFisicosSerializer, registroSerializer
from .models import AgendarClase, DatosFisicos, Registro
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



@api_view(['GET', 'POST'])
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