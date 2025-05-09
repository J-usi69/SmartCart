from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.conf import settings
from .models import Rol, Usuario
from .serializers import RolSerializer, UsuarioSerializer
from .permissions import IsStaffOrSuperUser
from rest_framework.response import Response
from .utils import send_gmail_email
from smtplib import SMTPException
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [IsStaffOrSuperUser]


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsStaffOrSuperUser]


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
            return Response({"detail": "Logout exitoso."}, status=status.HTTP_200_OK)
        except:
            return Response({"detail": "Error al cerrar sesión."}, status=status.HTTP_400_BAD_REQUEST)


User = get_user_model()


class CustomPasswordResetView(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('correo')
        if not email:
            return Response({'error': 'Debes proporcionar un correo electrónico.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(correo=email)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado con ese correo.'}, status=status.HTTP_404_NOT_FOUND)

        token = default_token_generator.make_token(user)
        uid = user.pk

        domain = "https://backenddjango-production-c48c.up.railway.app"
        reset_url = f"{domain}/api/reset-password-confirm/{uid}/{token}"

        subject = "Recuperación de Contraseña"
        html_content = f"""
            <p>Hola {user.nombre},</p>
            <p>Has solicitado restablecer tu contraseña. Haz click en el siguiente enlace:</p>
            <a href="{reset_url}">Restablecer contraseña</a>
            <p>Si no solicitaste este correo, puedes ignorarlo.</p>
        """

        try:
            send_gmail_email(email, subject, html_content)
            return Response({'message': 'Correo de recuperación enviado exitosamente.'}, status=status.HTTP_200_OK)
        except SMTPException as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uid, token):
        try:
            user = Usuario.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Token inválido o expirado."}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get("new_password")
            confirm_password = request.data.get("confirm_password")

            if not new_password or not confirm_password:
                return Response({"error": "Debes proporcionar y confirmar la nueva contraseña."}, status=status.HTTP_400_BAD_REQUEST)

            if new_password != confirm_password:
                return Response({"error": "Las contraseñas no coinciden."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.save()

            return Response({"detail": "Contraseña actualizada exitosamente."})

        except (TypeError, ValueError, OverflowError, Usuario.DoesNotExist):
            return Response({"error": "Link inválido."}, status=status.HTTP_400_BAD_REQUEST)

class RegisterClienteView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['rol'] = Rol.objects.get(nombre='Cliente').id
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Cliente registrado exitosamente."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterDeliveryView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['rol'] = Rol.objects.get(nombre='Delivery').id
        serializer = UsuarioSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Delivery registrado exitosamente."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomAuthTokenView(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        correo = request.data.get('correo')
        password = request.data.get('password')

        if not correo or not password:
            return Response({'detail': 'Debe ingresar correo y contraseña'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, correo=correo, password=password)

        if user is None:
            return Response({'detail': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)

        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user_id': user.id, 'correo': user.correo})