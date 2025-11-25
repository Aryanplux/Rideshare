# 🚗 RideShare - Interstate Return-Ride Optimization Platform

A full-stack ride-sharing web application focused on optimizing return trips for drivers and providing affordable rides for passengers.

## 🎯 Project Overview

**Frontend:** Next.js 16 + TypeScript + Tailwind CSS  
**Backend:** Django 5.0 + REST Framework + SQLite  
**Authentication:** JWT (JSON Web Tokens)

## ✨ Key Features

- 🔐 **Role-Based Authentication** - Driver & Passenger accounts
- 🚗 **Driver Dashboard** - Post trips, track earnings, view return matches
- 🧳 **Passenger Dashboard** - Search rides, book seats, save routes
- 💰 **Return-Ride Optimization** - AI-powered suggestions for return trips
- 📊 **Statistics Tracking** - Earnings, savings, CO₂ reduction
- 🎨 **Modern UI** - Animated, responsive, glassmorphism design
- ⚡ **Real-time Updates** - Hot reload, instant feedback

## 🚀 Quick Start

### Option 1: Use Startup Script (Easiest)

Double-click: `start_rideshare.bat`

This will open two command windows:
- Backend server (Django)
- Frontend server (Next.js)

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd rideshare-backend
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd rideshare
npm run dev
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin/

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [FULL_PROJECT_GUIDE.md](FULL_PROJECT_GUIDE.md) | Complete VS Code setup guide |
| [QUICK_START.md](QUICK_START.md) | Quick reference commands |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System architecture & data flow |
| [rideshare/HOW_TO_RUN.md](rideshare/HOW_TO_RUN.md) | Frontend-specific guide |
| [rideshare-backend/README.md](rideshare-backend/README.md) | Backend API documentation |

## 🛠️ First Time Setup

### Backend Setup
```bash
cd rideshare-backend
pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers python-decouple
python manage.py migrate
python manage.py createsuperuser  # Optional
```

### Frontend Setup
```bash
cd rideshare
npm install
```

## 📁 Project Structure

```
Antigravity/
├── rideshare/              # Frontend (Next.js)
│   ├── src/
│   │   ├── app/           # Pages
│   │   ├── components/    # React components
│   │   └── lib/           # Utilities
│   └── package.json
│
├── rideshare-backend/      # Backend (Django)
│   ├── users/             # User management
│   ├── trips/             # Trip & booking logic
│   ├── manage.py
│   └── db.sqlite3
│
├── FULL_PROJECT_GUIDE.md  # Complete guide
├── QUICK_START.md         # Quick reference
├── ARCHITECTURE.md        # Architecture docs
└── start_rideshare.bat    # Startup script
```

## 🎨 User Flows

### Driver Flow
1. Sign up as Driver (with vehicle info)
2. Post a trip (origin, destination, date, price)
3. View AI-powered return match suggestions
4. Track earnings and active trips
5. Manage bookings from passengers

### Passenger Flow
1. Sign up as Passenger
2. Search for rides (by route and date)
3. Book seats on available trips
4. Save frequently searched routes
5. Track money saved and CO₂ reduction

## 🔐 Authentication

- **JWT-based** authentication
- **Role-based** access control (Driver/Passenger)
- **Secure** password hashing (PBKDF2)
- **Token refresh** mechanism (7-day refresh tokens)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register user
- `POST /api/auth/login/` - Login (get tokens)
- `GET /api/auth/profile/` - User profile
- `GET /api/auth/stats/` - User statistics

### Trips
- `GET /api/trips/` - List/search trips
- `POST /api/trips/` - Create trip (driver)
- `GET /api/trips/my-trips/` - User's trips
- `GET /api/trips/return-matches/` - AI suggestions

### Bookings
- `GET /api/trips/bookings/` - List bookings
- `POST /api/trips/bookings/` - Create booking
- `PUT /api/trips/bookings/:id/` - Update booking

## 🗄️ Database Schema

**Users:**
- User (extended Django user with role)
- DriverProfile (vehicle info, ratings, earnings)
- PassengerProfile (trip history, savings)

**Trips:**
- Trip (route, date, price, seats)
- Booking (passenger reservations)
- SavedRoute (frequently searched routes)

## 🎯 Tech Stack

### Frontend
- **Framework:** Next.js 16.0.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State:** React Context API

### Backend
- **Framework:** Django 5.0
- **API:** Django REST Framework
- **Auth:** JWT (Simple JWT)
- **Database:** SQLite (dev), PostgreSQL-ready
- **CORS:** django-cors-headers

## 🧪 Testing

### Test Registration
```bash
# Backend running on 8000, Frontend on 3000
1. Go to http://localhost:3000
2. Click "Sign up"
3. Choose "Driver" or "Passenger"
4. Fill form and submit
5. Should redirect to dashboard
```

### Test API Directly
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123","password2":"test123","role":"passenger","phone":"123"}'
```

## 🛑 Stopping the Application

Press **Ctrl + C** in both terminal windows:
- Backend terminal
- Frontend terminal

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.14.0

# Reinstall dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate
```

### Frontend won't start
```bash
# Delete node_modules and reinstall
rmdir /s /q node_modules
npm install

# Delete .next and rebuild
rmdir /s /q .next
npm run dev
```

### Port already in use
```bash
# Backend - use different port
python manage.py runserver 8001

# Frontend - use different port
npm run dev -- -p 3001
```

## 📊 Features Implemented

- ✅ User registration with role selection
- ✅ JWT authentication
- ✅ Driver dashboard with trip management
- ✅ Passenger dashboard with bookings
- ✅ Trip creation and search
- ✅ Booking system with seat validation
- ✅ Saved routes functionality
- ✅ Return match suggestions (mock AI)
- ✅ Statistics tracking
- ✅ Responsive design
- ✅ Animated UI components
- ✅ Django admin panel

## 🚧 Future Enhancements

- [ ] Real-time chat between drivers and passengers
- [ ] Payment integration (Stripe/PayPal)
- [ ] Google Maps integration
- [ ] Push notifications
- [ ] Rating and review system
- [ ] Advanced AI matching algorithm
- [ ] Mobile app (React Native)

## 📝 Development Notes

- **Hot Reload:** Both servers support hot reload
- **CORS:** Configured for localhost:3000
- **Database:** SQLite for development
- **Tokens:** Access (1hr), Refresh (7 days)

## 🤝 Contributing

This is a prototype/demo project. For production use:
1. Switch to PostgreSQL
2. Add proper error handling
3. Implement payment gateway
4. Add comprehensive tests
5. Set up CI/CD pipeline
6. Configure production environment

## 📄 License

This project is for educational/demonstration purposes.

---

## 🎉 Getting Started

1. **Read:** [FULL_PROJECT_GUIDE.md](FULL_PROJECT_GUIDE.md)
2. **Run:** `start_rideshare.bat`
3. **Open:** http://localhost:3000
4. **Enjoy!** 🚀

---

**Made with ❤️ using Next.js & Django**
