# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Product, Order, News, OrderItem

# Регистрируем кастомную модель User с кастомным админ-классом
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Поля, которые будут отображаться в списке
    list_display = ('username', 'email', 'role')
    
    # Поля для поиска
    search_fields = ('username', 'email')
    
    # Порядок сортировки
    ordering = ('-date_joined',)

    # Настройка формы создания пользователя
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )
    
    # Ваши кастомные действия
    actions = ['make_admin', 'make_user']
    
    @admin.action(description='Сделать админом')
    def make_admin(self, request, queryset):
        updated = queryset.update(role="ADMIN")
        self.message_user(request, f'{updated} пользователей стали администраторами')
    
    @admin.action(description='Сделать обычным пользователем')
    def make_user(self, request, queryset):
        updated = queryset.update(role="USER")
        self.message_user(request, f'{updated} пользователей стали обычными пользователями')

# Регистрируем остальные модели
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price')
    search_fields = ('title',)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'created_at')

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'quantity')
