from django.db import models
from django.utils import timezone
from datetime import timedelta

# Create your models here.
class Registro(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    correo = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

class AgendarClase(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)


class DatosFisicos(models.Model):
    usuario = models.ForeignKey(Registro, on_delete=models.CASCADE)
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    altura = models.DecimalField(max_digits=5, decimal_places=2)
    imc = models.DecimalField(max_digits=4, decimal_places=1)
    fecha = models.DateField(auto_now_add=True)


class Coach(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    correo = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    bibliografia = models.CharField(max_length=250)
    especialiad = models.CharField(max_length=50)

class Membresia(models.Model):
    usuario = models.ForeignKey(Registro, on_delete=models.CASCADE)

    plan_nombre = models.CharField(max_length=50)       
    plan_clases = models.IntegerField()                
    plan_precio = models.IntegerField()                 

    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.end_date:
            self.end_date = self.start_date + timedelta(days=30)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.usuario} → {self.plan_nombre}"
    
class NuevoCoach(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    correo = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    bibliografia = models.CharField(max_length=250)
    especialidad = models.CharField(max_length=50) 

