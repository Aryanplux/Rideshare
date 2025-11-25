from rest_framework import serializers
from .models import Trip, Booking, SavedRoute
from users.serializers import UserSerializer

class TripSerializer(serializers.ModelSerializer):
    driver = UserSerializer(read_only=True)
    
    class Meta:
        model = Trip
        fields = ['id', 'driver', 'origin', 'destination', 'departure_date', 'departure_time', 
                  'available_seats', 'price_per_seat', 'status', 'is_return_trip', 'created_at']
        read_only_fields = ['id', 'driver', 'created_at']


class BookingSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    passenger = UserSerializer(read_only=True)
    trip_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Booking
        fields = ['id', 'trip', 'trip_id', 'passenger', 'seats_booked', 'total_price', 'status', 'created_at']
        read_only_fields = ['id', 'passenger', 'created_at']
    
    def validate(self, attrs):
        trip_id = attrs.get('trip_id')
        seats_booked = attrs.get('seats_booked', 1)
        
        try:
            trip = Trip.objects.get(id=trip_id)
        except Trip.DoesNotExist:
            raise serializers.ValidationError({"trip_id": "Trip not found."})
        
        if trip.available_seats < seats_booked:
            raise serializers.ValidationError({"seats_booked": "Not enough available seats."})
        
        attrs['total_price'] = trip.price_per_seat * seats_booked
        return attrs


class SavedRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedRoute
        fields = ['id', 'origin', 'destination', 'search_count', 'created_at']
        read_only_fields = ['id', 'search_count', 'created_at']
