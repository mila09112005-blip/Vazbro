from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, NewsListAPIView
from .views import UserRegisterAPIView, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('products/', ProductListAPIView.as_view()),
    path('products/<int:pk>/', ProductDetailAPIView.as_view()),
    path('news/', NewsListAPIView.as_view()),
]

urlpatterns += [
    path('auth/register/', UserRegisterAPIView.as_view()),
    path('auth/login/', MyTokenObtainPairView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
]

from .views import AdminUserListAPIView

urlpatterns += [
    path("admin/users/", AdminUserListAPIView.as_view()),
]
