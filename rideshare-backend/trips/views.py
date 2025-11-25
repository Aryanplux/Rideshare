from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.db.models import Q
from .models import Trip, Booking, SavedRoute
from .serializers import TripSerializer, BookingSerializer, SavedRouteSerializer

class TripListCreateView(generics.ListCreateAPIView):
    """List all trips or create a new trip (drivers only)"""
    serializer_class = TripSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        queryset = Trip.objects.filter(status='active')
        
        # Filter by origin/destination
        origin = self.request.query_params.get('origin')
        destination = self.request.query_params.get('destination')
        date = self.request.query_params.get('date')
        
        if origin:
            queryset = queryset.filter(origin__icontains=origin)
        if destination:
            queryset = queryset.filter(destination__icontains=destination)
        if date:
            queryset = queryset.filter(departure_date=date)
        
        return queryset
    
    def perform_create(self, serializer):
        if self.request.user.role != 'driver':
            raise PermissionError("Only drivers can create trips")
        serializer.save(driver=self.request.user)


class TripDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a trip"""
    serializer_class = TripSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return Trip.objects.filter(driver=self.request.user)


class MyTripsView(generics.ListAPIView):
    """Get current user's trips (drivers)"""
    serializer_class = TripSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return Trip.objects.filter(driver=self.request.user)


class BookingListCreateView(generics.ListCreateAPIView):
    """List user's bookings or create a new booking"""
    serializer_class = BookingSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return Booking.objects.filter(passenger=self.request.user)
    
    def perform_create(self, serializer):
        if self.request.user.role != 'passenger':
            raise PermissionError("Only passengers can create bookings")
        
        booking = serializer.save(passenger=self.request.user)
        
        # Update trip available seats
        trip = booking.trip
        trip.available_seats -= booking.seats_booked
        trip.save()


class BookingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a booking"""
    serializer_class = BookingSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return Booking.objects.filter(passenger=self.request.user)


class SavedRouteListCreateView(generics.ListCreateAPIView):
    """List or create saved routes"""
    serializer_class = SavedRouteSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self):
        return SavedRoute.objects.filter(passenger=self.request.user)
    
    def perform_create(self, serializer):
        # Check if route already exists
        origin = serializer.validated_data['origin']
        destination = serializer.validated_data['destination']
        
        route, created = SavedRoute.objects.get_or_create(
            passenger=self.request.user,
            origin=origin,
            destination=destination
        )
        
        if not created:
            route.search_count += 1
            route.save()


class ReturnMatchesView(APIView):
    """Get AI-powered return match suggestions (mock)"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        # Mock return matches based on user's trips
        if request.user.role != 'driver':
            return Response({'error': 'Only drivers can access return matches'}, status=400)
        
        # Get user's recent trips
        recent_trips = Trip.objects.filter(driver=request.user, status='active')[:5]
        
        matches = []
        for trip in recent_trips:
            # Mock return match
            matches.append({
                'route': f"{trip.destination} → {trip.origin}",
                'passengers': 3,
                'estimated_earnings': 120,
                'match_probability': 95,
                'time_window': '6:00 PM - 8:00 PM'
            })
        
        return Response(matches)
