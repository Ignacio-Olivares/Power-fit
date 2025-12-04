from django.shortcuts import render
from .serializer import agendarClaseSerializer, datosFisicosSerializer, registroSerializer, coachSerializer, membresiaSerializer
from .models import AgendarClase, DatosFisicos, Registro, Coach, Membresia
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone

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

@api_view(['GET'])
def datosFisicos_usuario(request, user_id):
    datos = DatosFisicos.objects.filter(usuario_id=user_id).order_by('-fecha')
    serializer = datosFisicosSerializer(datos, many=True)
    return Response(serializer.data)


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
    
@api_view(['GET', 'POST', 'PATCH'])
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
    
    if request.method == 'PATCH':
        serializer = coachSerializer(Coach, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    
@api_view(['POST'])
def membresia_list(request):
    usuario_id = request.data.get("usuario")

    usuario = Registro.objects.get(id=usuario_id)

    activa = Membresia.objects.filter(usuario=usuario, is_active=True).first()
    if activa:
        return Response({"error": "Ya tienes una membresía activa"}, status=400)

    serializer = membresiaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def comprar_membresia_list(request):
    # 1. Obtener los datos enviados desde el Frontend
    usuario_id = request.data.get("usuario")
    plan_nombre = request.data.get("plan_nombre")
    plan_clases = request.data.get("plan_clases")
    plan_precio = request.data.get("plan_precio")

    # 2. Validar que el usuario existe en la base de datos
    try:
        usuario_instancia = Registro.objects.get(id=usuario_id)
    except Registro.DoesNotExist:
        return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    # 3. Validar si ya tiene una membresía activa (Opcional, regla de negocio)
    activa = Membresia.objects.filter(usuario=usuario_instancia, is_active=True).first()
    if activa:
        return Response({"error": "Ya tienes una membresía activa"}, status=status.HTTP_400_BAD_REQUEST)

    # 4. Crear la membresía ANIDADA al usuario
    # Al pasar 'usuario=usuario_instancia', Django crea la relación ForeignKey
    nueva_membresia = Membresia.objects.create(
        usuario=usuario_instancia, 
        plan_nombre=plan_nombre,
        plan_clases=plan_clases,
        plan_precio=plan_precio,
        start_date=timezone.now(),
        is_active=True
        # end_date se calcula automáticamente en el save() del modelo que ya definiste
    )
    
    return Response({
        "mensaje": "Membresía activada exitosamente",
        "usuario": usuario_instancia.nombre,
        "plan": nueva_membresia.plan_nombre,
        "start_date": nueva_membresia.start_date,
        "end_date": nueva_membresia.end_date
    }, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def membresia_activa(request, user_id):
    try:
        usuario = Registro.objects.get(id=user_id)
    except Registro.DoesNotExist:
        return Response({"activa": False})

    membresia = Membresia.objects.filter(usuario=usuario, is_active=True).first()

    if not membresia:
        return Response({"activa": False})

    return Response({
        "activa": True,
        "plan_nombre": membresia.plan_nombre,
        "plan_clases": membresia.plan_clases,
        "plan_precio": membresia.plan_precio,
        "start_date": membresia.start_date,
        "end_date": membresia.end_date,
    })


@api_view(['POST'])
def login_usuario(request):
    correo = request.data.get("correo")
    password = request.data.get("password")

    try:
        usuario = Registro.objects.get(correo=correo, password=password)
    except Registro.DoesNotExist:
        return Response({"error": "Credenciales incorrectas"}, status=400)

    return Response({
        "id": usuario.id,
        "nombre": usuario.nombre,
        "correo": usuario.correo,
        'apellido': usuario.apellido
    })


