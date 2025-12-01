from django.contrib import admin
from .models import AgendarClase, DatosFisicos, Usuario

# Register your models here.

class agendarHoraAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'apellido']

admin.site.register(AgendarClase)


admin.site.register(DatosFisicos)
admin.site.register(Usuario)
