from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    """User registration endpoint"""
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class UserProfileView(APIView):
    """Get current user profile"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserStatsView(APIView):
    """Get user statistics"""
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        user = request.user
        
        if user.role == 'driver':
            profile = user.driver_profile
            stats = {
                'active_trips': user.trips.filter(status='active').count(),
                'total_trips': profile.total_trips,
                'total_earnings': float(profile.total_earnings),
                'rating': float(profile.rating),
            }
        else:
            profile = user.passenger_profile
            stats = {
                'upcoming_rides': user.bookings.filter(status='confirmed').count(),
                'total_trips': profile.total_trips,
                'money_saved': float(profile.money_saved),
                'co2_saved': float(profile.co2_saved),
            }
        
        return Response(stats)
