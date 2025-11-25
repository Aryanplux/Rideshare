# 🏗️ RideShare - Project Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                │
│                    (Web Browser)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js)                         │
│              http://localhost:3000                          │
├─────────────────────────────────────────────────────────────┤
│  📁 Pages:                                                  │
│    • Landing Page (/)                                       │
│    • Driver Flow (/driver/post)                            │
│    • Passenger Flow (/passenger/search)                    │
│    • Dashboard (/dashboard)                                │
│                                                             │
│  🎨 Components:                                             │
│    • Navbar (role-based navigation)                        │
│    • Auth Modals (signup/login)                            │
│    • UI Components (cards, buttons, etc.)                  │
│                                                             │
│  🔧 State Management:                                       │
│    • AuthContext (user state)                              │
│    • API Client (fetch wrapper)                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ API Calls (JWT Auth)
                     │ http://localhost:8000/api/
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND (Django)                           │
│              http://localhost:8000                          │
├─────────────────────────────────────────────────────────────┤
│  🔐 Authentication:                                         │
│    • JWT Token Generation                                  │
│    • User Registration                                     │
│    • Login/Logout                                          │
│                                                             │
│  📡 API Endpoints:                                          │
│    • /api/auth/register/                                   │
│    • /api/auth/login/                                      │
│    • /api/auth/profile/                                    │
│    • /api/trips/                                           │
│    • /api/trips/bookings/                                  │
│    • /api/trips/routes/saved/                              │
│                                                             │
│  🧠 Business Logic:                                         │
│    • Trip Management                                       │
│    • Booking System                                        │
│    • Return Match Algorithm                                │
│    • Seat Availability                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ ORM (Django Models)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATABASE (SQLite)                          │
│                    db.sqlite3                               │
├─────────────────────────────────────────────────────────────┤
│  📊 Tables:                                                 │
│    • users_user (accounts)                                 │
│    • users_driverprofile (driver info)                     │
│    • users_passengerprofile (passenger info)               │
│    • trips_trip (trip listings)                            │
│    • trips_booking (reservations)                          │
│    • trips_savedroute (saved routes)                       │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Examples

### 1. User Registration (Driver)

```
User fills form → Frontend validates → POST /api/auth/register/
                                              ↓
                                    Backend creates:
                                    • User account
                                    • DriverProfile
                                    • JWT tokens
                                              ↓
                                    Returns: user + tokens
                                              ↓
Frontend stores tokens → Redirects to Dashboard
```

### 2. Creating a Trip

```
Driver fills form → POST /api/trips/
                           ↓
                    Backend validates:
                    • User is driver
                    • All fields present
                           ↓
                    Creates Trip in DB
                           ↓
                    Returns: trip details
                           ↓
Frontend shows success → Updates UI
```

### 3. Booking a Ride

```
Passenger clicks "Book" → POST /api/trips/bookings/
                                    ↓
                          Backend validates:
                          • User is passenger
                          • Seats available
                          • Trip exists
                                    ↓
                          Creates Booking
                          Updates available seats
                                    ↓
                          Returns: booking details
                                    ↓
Frontend shows confirmation → Updates UI
```

## Technology Stack

### Frontend
```
Next.js 16.0.4
├── React 19
├── TypeScript
├── Tailwind CSS v4
├── Framer Motion (animations)
├── Lucide React (icons)
└── React CountUp, Confetti
```

### Backend
```
Django 5.0
├── Django REST Framework
├── JWT Authentication
├── CORS Headers
├── SQLite (dev)
└── Python 3.14
```

## File Structure

```
Antigravity/
│
├── rideshare/                    # FRONTEND
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx         # Landing
│   │   │   ├── dashboard/       # Dashboard
│   │   │   ├── driver/          # Driver pages
│   │   │   └── passenger/       # Passenger pages
│   │   ├── components/
│   │   │   ├── auth/            # Auth modals
│   │   │   ├── layout/          # Navbar
│   │   │   └── ui/              # UI components
│   │   └── lib/
│   │       ├── context/         # Auth context
│   │       └── animations.ts    # Framer Motion
│   ├── package.json
│   └── tailwind.config.ts
│
├── rideshare-backend/            # BACKEND
│   ├── rideshare_api/
│   │   ├── settings.py          # Configuration
│   │   └── urls.py              # Main routing
│   ├── users/
│   │   ├── models.py            # User models
│   │   ├── views.py             # Auth endpoints
│   │   ├── serializers.py       # Data serialization
│   │   └── urls.py              # Auth routes
│   ├── trips/
│   │   ├── models.py            # Trip models
│   │   ├── views.py             # Trip endpoints
│   │   ├── serializers.py       # Data serialization
│   │   └── urls.py              # Trip routes
│   ├── manage.py
│   ├── db.sqlite3               # Database
│   └── requirements.txt
│
├── FULL_PROJECT_GUIDE.md        # Complete guide
├── QUICK_START.md               # Quick reference
└── start_rideshare.bat          # Startup script
```

## Communication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│          │  HTTP   │          │   ORM   │          │
│ Frontend │◄───────►│ Backend  │◄───────►│ Database │
│ (Next.js)│  JSON   │ (Django) │  SQL    │ (SQLite) │
│          │         │          │         │          │
└──────────┘         └──────────┘         └──────────┘
     │                     │                     │
     │                     │                     │
  Port 3000            Port 8000            db.sqlite3
```

## Authentication Flow

```
1. User registers
   ↓
2. Backend creates user + profile
   ↓
3. Backend generates JWT tokens
   ↓
4. Frontend stores tokens
   ↓
5. Frontend includes token in all API requests
   ↓
6. Backend validates token
   ↓
7. Backend returns protected data
```

## Development Workflow

```
┌─────────────────────────────────────────┐
│  1. Start Backend (Terminal 1)         │
│     python manage.py runserver          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. Start Frontend (Terminal 2)        │
│     npm run dev                         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. Open Browser                        │
│     http://localhost:3000               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  4. Test Features                       │
│     • Sign up                           │
│     • Create trips                      │
│     • Book rides                        │
└─────────────────────────────────────────┘
```

---

**This architecture provides:**
- ✅ Separation of concerns (frontend/backend)
- ✅ RESTful API design
- ✅ Secure authentication (JWT)
- ✅ Role-based access control
- ✅ Scalable structure
- ✅ Hot reload for development
