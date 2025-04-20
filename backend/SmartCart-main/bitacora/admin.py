
from django.contrib import admin
from .models import Bitacora

@admin.register(Bitacora)
class BitacoraAdmin(admin.ModelAdmin):
    list_display = ('fecha_hora', 'usuario', 'accion', 'modulo')
    search_fields = ('usuario', 'accion', 'modulo')
    list_filter = ('modulo', 'fecha_hora')
