from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User

admin.site.register(User)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]