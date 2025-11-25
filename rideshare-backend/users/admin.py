from django.contrib import admin
from .models import User, DriverProfile, PassengerProfile

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'phone', 'created_at']
    list_filter = ['role', 'created_at']
    search_fields = ['username', 'email', 'phone']

@admin.register(DriverProfile)
class DriverProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'vehicle_make', 'vehicle_model', 'rating', 'total_trips']
    search_fields = ['user__username', 'license_number']

@admin.register(PassengerProfile)
class PassengerProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_trips', 'money_saved']
    search_fields = ['user__username']
