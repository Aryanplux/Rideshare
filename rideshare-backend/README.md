# RideShare Django Backend API

Complete REST API backend for the RideShare application with SQLite database.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 4. Run Development Server
```bash
python manage.py runserver
```

API will be available at: `http://localhost:8000`

## 📚 API Endpoints

### Authentication (`/api/auth/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register/` | Register new user (driver/passenger) |
| POST | `/login/` | Login and get JWT tokens |
| POST | `/refresh/` | Refresh access token |
| GET | `/profile/` | Get current user profile |
| PUT | `/profile/` | Update user profile |
| GET | `/stats/` | Get user statistics |

### Trips (`/api/trips/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List all trips (with filters) |
| POST | `/` | Create new trip (drivers only) |
| GET | `/:id/` | Get trip details |
| PUT | `/:id/` | Update trip |
| DELETE | `/:id/` | Delete trip |
| GET | `/my-trips/` | Get user's trips |
| GET | `/return-matches/` | Get AI return matches |

### Bookings (`/api/trips/bookings/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List user's bookings |
| POST | `/` | Create new booking |
| GET | `/:id/` | Get booking details |
| PUT | `/:id/` | Update booking |
| DELETE | `/:id/` | Cancel booking |

### Routes (`/api/trips/routes/`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/saved/` | Get saved routes |
| POST | `/saved/` | Save a route |

## 📝 Request Examples

### Register Driver
```json
POST /api/auth/register/
{
  "username": "john_driver",
  "email": "john@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "driver",
  "phone": "+1234567890",
  "license_number": "DL123456",
  "vehicle_make": "Toyota",
  "vehicle_model": "Camry",
  "vehicle_year": 2020,
  "vehicle_seats": 4
}
```

### Register Passenger
```json
POST /api/auth/register/
{
  "username": "jane_passenger",
  "email": "jane@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "first_name": "Jane",
  "last_name": "Smith",
  "role": "passenger",
  "phone": "+1234567890"
}
```

### Login
```json
POST /api/auth/login/
{
  "username": "john_driver",
  "password": "securepass123"
}

Response:
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Create Trip (Driver)
```json
POST /api/trips/
Headers: Authorization: Bearer {access_token}
{
  "origin": "New York",
  "destination": "Boston",
  "departure_date": "2025-12-01",
  "departure_time": "14:00",
  "available_seats": 3,
  "price_per_seat": 45.00
}
```

### Search Trips
```
GET /api/trips/?origin=New York&destination=Boston&date=2025-12-01
Headers: Authorization: Bearer {access_token}
```

### Create Booking (Passenger)
```json
POST /api/trips/bookings/
Headers: Authorization: Bearer {access_token}
{
  "trip_id": 1,
  "seats_booked": 2
}
```

## 🗄️ Database Models

### User
- Extended Django User with role (driver/passenger)
- Fields: username, email, role, phone, avatar

### DriverProfile
- One-to-one with User
- Fields: license_number, vehicle info, rating, earnings

### PassengerProfile
- One-to-one with User
- Fields: total_trips, money_saved, co2_saved

### Trip
- Created by drivers
- Fields: origin, destination, date, time, seats, price, status

### Booking
- Created by passengers
- Fields: trip, passenger, seats, price, status

### SavedRoute
- Passenger's frequently searched routes
- Fields: origin, destination, search_count

## 🔐 Authentication

Uses JWT (JSON Web Tokens) for authentication.

**Include token in requests:**
```
Authorization: Bearer {access_token}
```

**Token lifetime:**
- Access token: 1 hour
- Refresh token: 7 days

## 🛠️ Admin Panel

Access Django admin at: `http://localhost:8000/admin/`

Create superuser:
```bash
python manage.py createsuperuser
```

## 📦 Tech Stack

- Django 5.0
- Django REST Framework
- JWT Authentication
- SQLite (dev) / PostgreSQL (prod ready)
- CORS enabled for frontend

## 🔧 Configuration

CORS is configured to allow requests from:
- `http://localhost:3000` (Next.js frontend)
- `http://127.0.0.1:3000`

## 📁 Project Structure

```
rideshare-backend/
├── manage.py
├── requirements.txt
├── db.sqlite3
├── rideshare_api/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── users/
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
└── trips/
    ├── models.py
    ├── serializers.py
    ├── views.py
    ├── urls.py
    └── admin.py
```

## ✅ Testing

Test endpoints using:
- Postman
- curl
- Django REST Framework browsable API

## 🚀 Deployment

For production:
1. Set `DEBUG = False`
2. Configure PostgreSQL database
3. Set proper `ALLOWED_HOSTS`
4. Use environment variables for secrets
5. Configure static/media file serving

---

**Backend is ready!** Start the server and connect your frontend.
