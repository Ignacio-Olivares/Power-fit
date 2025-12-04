"""
URL configuration for django_api_powerfit project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('agendarClase/', views.agendarClase_list),
    path('datosFisico/', views.datosFisicos_list),
    path("datosFisicos/<int:user_id>/", views.datosFisicos_usuario),
    path('registro/', views.registro_list),
    path('registro/<int:pk>/', views.registro_list),
    path('coach/', views.coach_list),
    path('membresia/', views.membresia_list),
    path('comprar-membresia/', views.comprar_membresia_list),
    path('coach/membresias/', views.listar_todas_membresias),
    path('coach/aprobar-membresia/<int:membresia_id>/', views.aprobar_membresia),
    path('login/', views.login_usuario),
    path("membresia-activa/<int:user_id>/", views.membresia_activa),
    path("coaches/", views.coach_list),
    path("coaches/<int:coach_id>/", views.coach_detail),
    path('membresia/eliminar/<int:membresia_id>/', views.eliminar_membresia),
    path("horario/", views.horario_list),
    path("horario/<int:pk>/", views.horario_delete),
    path("pagos/", views.pagos_list, name="pagos_list"),
    path("pagos/exportar/", views.exportar_pagos, name="exportar_pagos"), 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)