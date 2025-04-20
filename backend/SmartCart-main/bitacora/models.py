
from django.db import models
from django.utils.timezone import now

class Bitacora(models.Model):
    usuario = models.CharField(max_length=150)
    accion = models.CharField(max_length=255)
    modulo = models.CharField(max_length=100)
    fecha_hora = models.DateTimeField(default=now)

    def __str__(self):
        return f"{self.fecha_hora} - {self.usuario} - {self.accion} en {self.modulo}"
