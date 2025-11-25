# 🚀 RideShare - Quick Start

## Run Both Servers (Copy & Paste)

### Terminal 1 - Backend
```bash
cd C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare-backend
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare
npm run dev
```

## Access Points

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000/api/
- **Admin Panel:** http://localhost:8000/admin/

## Stop Servers

Press **Ctrl + C** in each terminal

---

## First Time Setup

### Backend (Once)
```bash
cd rideshare-backend
pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers python-decouple
python manage.py migrate
```

### Frontend (Once)
```bash
cd rideshare
npm install
```

---

## Common Commands

### Backend
```bash
python manage.py runserver          # Start server
python manage.py migrate            # Run migrations
python manage.py createsuperuser    # Create admin
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Check code quality
```

---

**Full Guide:** See `FULL_PROJECT_GUIDE.md`
