from django.db import models

# Create your models here.

class AgendarClase(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)


class DatosFisicos(models.Model):
    peso =  models.DecimalField(max_digits=3, decimal_places=2)
    altura = models.DecimalField(max_digits=3, decimal_places=2)


class Registro(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    correo = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)

class Coach(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    correo = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    bibliografia = models.CharField(max_length=250)
    especialiad = models.CharField(max_length=50)