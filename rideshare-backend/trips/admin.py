from django.contrib import admin
from .models import Trip, Booking, SavedRoute

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['origin', 'destination', 'driver', 'departure_date', 'status', 'available_seats']
    list_filter = ['status', 'departure_date', 'is_return_trip']
    search_fields = ['origin', 'destination', 'driver__username']

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['passenger', 'trip', 'seats_booked', 'total_price', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['passenger__username', 'trip__origin', 'trip__destination']

@admin.register(SavedRoute)
class SavedRouteAdmin(admin.ModelAdmin):
    list_display = ['passenger', 'origin', 'destination', 'search_count']
    search_fields = ['passenger__username', 'origin', 'destination']
