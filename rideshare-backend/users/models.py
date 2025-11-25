from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """Extended User model with role-based authentication"""
    ROLE_CHOICES = [
        ('driver', 'Driver'),
        ('passenger', 'Passenger'),
    ]
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone = models.CharField(max_length=20)
    # avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)  # Removed for simplicity
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.username} ({self.role})"


class DriverProfile(models.Model):
    """Driver-specific profile information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='driver_profile')
    license_number = models.CharField(max_length=50)
    vehicle_make = models.CharField(max_length=50)
    vehicle_model = models.CharField(max_length=50)
    vehicle_year = models.IntegerField()
    vehicle_seats = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=5.0)
    total_trips = models.IntegerField(default=0)
    total_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self):
        return f"Driver: {self.user.username}"


class PassengerProfile(models.Model):
    """Passenger-specific profile information"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='passenger_profile')
    total_trips = models.IntegerField(default=0)
    money_saved = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    co2_saved = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    def __str__(self):
        return f"Passenger: {self.user.username}"
