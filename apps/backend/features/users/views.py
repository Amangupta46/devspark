from django.core.exceptions import ValidationError
from drf_spectacular.utils import OpenApiResponse, extend_schema
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView

from common.responses import get_error_response, get_success_response

from .selectors import get_user_profile
from .serializers import (
    ChangePasswordSerializer,
    LoginSerializer,
    ProfileSerializer,
    RegisterSerializer,
)
from .services import LoginService, PasswordService, RegisterService


class RegisterView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(request=RegisterSerializer, responses={201: ProfileSerializer})
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = RegisterService.execute(serializer.validated_data)
                return get_success_response(
                    data={"id": user.id, "email": user.email},
                    message="Registration successful. Please check your email for verification.",
                    status_code=status.HTTP_201_CREATED,
                )
            except ValidationError as e:
                return get_error_response(
                    message=str(e.message if hasattr(e, "message") else e.messages[0])
                )
        return get_error_response(errors=serializer.errors)


class LoginView(APIView):
    permission_classes = [AllowAny]

    @extend_schema(
        request=LoginSerializer, responses={200: OpenApiResponse(description="Tokens returned")}
    )
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            try:
                tokens = LoginService.execute(
                    email=serializer.validated_data["email"],
                    password=serializer.validated_data["password"],
                    request=request,
                )
                return get_success_response(data=tokens, message="Login successful.")
            except ValidationError as e:
                return get_error_response(
                    message=str(e.message if hasattr(e, "message") else e.messages[0]),
                    status_code=401,
                )
        return get_error_response(errors=serializer.errors)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses={200: ProfileSerializer})
    def get(self, request):
        profile = get_user_profile(request.user)
        return get_success_response(data=profile)

    @extend_schema(request=ProfileSerializer, responses={200: ProfileSerializer})
    def patch(self, request):
        serializer = ProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return get_success_response(
                data=serializer.data, message="Profile updated successfully."
            )
        return get_error_response(errors=serializer.errors)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(request=ChangePasswordSerializer)
    def patch(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            try:
                PasswordService.change_password(
                    user=request.user,
                    old_password=serializer.validated_data["old_password"],
                    new_password=serializer.validated_data["new_password"],
                )
                return get_success_response(message="Password changed successfully.")
            except ValidationError as e:
                return get_error_response(
                    message=str(e.message if hasattr(e, "message") else e.messages[0])
                )
        return get_error_response(errors=serializer.errors)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(responses={200: OpenApiResponse(description="Logged out")})
    def post(self, request):
        # In a real setup, we would blacklist the refresh token here
        return get_success_response(message="Logged out successfully.")
