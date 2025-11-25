from django.urls import path
from .views import (
    TripListCreateView, TripDetailView, MyTripsView,
    BookingListCreateView, BookingDetailView,
    SavedRouteListCreateView, ReturnMatchesView
)

urlpatterns = [
    # Trips
    path('', TripListCreateView.as_view(), name='trip_list_create'),
    path('<int:pk>/', TripDetailView.as_view(), name='trip_detail'),
    path('my-trips/', MyTripsView.as_view(), name='my_trips'),
    path('return-matches/', ReturnMatchesView.as_view(), name='return_matches'),
    
    # Bookings
    path('bookings/', BookingListCreateView.as_view(), name='booking_list_create'),
    path('bookings/<int:pk>/', BookingDetailView.as_view(), name='booking_detail'),
    
    # Saved Routes
    path('routes/saved/', SavedRouteListCreateView.as_view(), name='saved_routes'),
]
