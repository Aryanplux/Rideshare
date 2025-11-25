from rest_framework import serializers
from .models import User, DriverProfile, PassengerProfile

class DriverProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverProfile
        fields = ['license_number', 'vehicle_make', 'vehicle_model', 'vehicle_year', 'vehicle_seats', 'rating', 'total_trips', 'total_earnings']


class PassengerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassengerProfile
        fields = ['total_trips', 'money_saved', 'co2_saved']


class UserSerializer(serializers.ModelSerializer):
    driver_profile = DriverProfileSerializer(required=False)
    passenger_profile = PassengerProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'phone', 'avatar', 'driver_profile', 'passenger_profile', 'created_at']
        read_only_fields = ['id', 'created_at']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}, label='Confirm Password')
    
    # Driver fields
    license_number = serializers.CharField(required=False, allow_blank=True)
    vehicle_make = serializers.CharField(required=False, allow_blank=True)
    vehicle_model = serializers.CharField(required=False, allow_blank=True)
    vehicle_year = serializers.IntegerField(required=False, allow_null=True)
    vehicle_seats = serializers.IntegerField(required=False, allow_null=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name', 'role', 'phone', 
                  'license_number', 'vehicle_make', 'vehicle_model', 'vehicle_year', 'vehicle_seats']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Validate driver fields
        if attrs.get('role') == 'driver':
            required_fields = ['license_number', 'vehicle_make', 'vehicle_model', 'vehicle_year', 'vehicle_seats']
            for field in required_fields:
                if not attrs.get(field):
                    raise serializers.ValidationError({field: f"{field} is required for drivers."})
        
        return attrs
    
    def create(self, validated_data):
        # Remove password2 and driver fields
        validated_data.pop('password2')
        license_number = validated_data.pop('license_number', None)
        vehicle_make = validated_data.pop('vehicle_make', None)
        vehicle_model = validated_data.pop('vehicle_model', None)
        vehicle_year = validated_data.pop('vehicle_year', None)
        vehicle_seats = validated_data.pop('vehicle_seats', None)
        
        # Create user
        user = User.objects.create_user(**validated_data)
        
        # Create role-specific profile
        if user.role == 'driver':
            DriverProfile.objects.create(
                user=user,
                license_number=license_number,
                vehicle_make=vehicle_make,
                vehicle_model=vehicle_model,
                vehicle_year=vehicle_year,
                vehicle_seats=vehicle_seats
            )
        else:
            PassengerProfile.objects.create(user=user)
        
        return user
