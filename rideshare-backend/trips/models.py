from django.db import models
from users.models import User

class Trip(models.Model):
    """Trip model for ride sharing"""
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    driver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    departure_date = models.DateField()
    departure_time = models.TimeField()
    available_seats = models.IntegerField()
    price_per_seat = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    is_return_trip = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.origin} → {self.destination} ({self.departure_date})"


class Booking(models.Model):
    """Booking model for passenger reservations"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='bookings')
    passenger = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    seats_booked = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.passenger.username} - {self.trip}"


class SavedRoute(models.Model):
    """Saved routes for passengers"""
    passenger = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_routes')
    origin = models.CharField(max_length=200)
    destination = models.CharField(max_length=200)
    search_count = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['passenger', 'origin', 'destination']
    
    def __str__(self):
        return f"{self.passenger.username}: {self.origin} → {self.destination}"
