# 🚀 Complete RideShare Project - VS Code Setup Guide

## 📁 Project Structure

You have TWO projects that work together:

```
C:\Users\aryan\OneDrive\Desktop\Antigravity\
├── rideshare/              # Frontend (Next.js)
└── rideshare-backend/      # Backend (Django)
```

---

## 🎯 Quick Start (Both Servers)

### Option 1: Run Both in Same VS Code Window

1. **Open VS Code**
2. **File** → **Open Folder**
3. Select: `C:\Users\aryan\OneDrive\Desktop\Antigravity`
4. Open **2 terminals** (Terminal → New Terminal, twice)

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

### Option 2: Separate VS Code Windows

**Window 1 - Backend:**
1. Open VS Code
2. Open folder: `C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare-backend`
3. Open terminal (Ctrl + `)
4. Run: `python manage.py runserver`

**Window 2 - Frontend:**
1. Open new VS Code window
2. Open folder: `C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare`
3. Open terminal (Ctrl + `)
4. Run: `npm run dev`

---

## 🔧 Detailed Setup Instructions

### STEP 1: Backend Setup (Django)

#### 1.1 Open Backend in VS Code
```
File → Open Folder → C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare-backend
```

#### 1.2 Open Terminal
Press **Ctrl + `** (backtick)

#### 1.3 Verify Python Installation
```bash
python --version
```
Should show: Python 3.14.0

#### 1.4 Install Dependencies (First Time Only)
```bash
pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers python-decouple
```

#### 1.5 Run Migrations (First Time Only)
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 1.6 Create Admin User (Optional)
```bash
python manage.py createsuperuser
```
Follow prompts to create username/password

#### 1.7 Start Backend Server
```bash
python manage.py runserver
```

✅ **Backend running at:** `http://localhost:8000`

**Keep this terminal running!**

---

### STEP 2: Frontend Setup (Next.js)

#### 2.1 Open Frontend in VS Code
- If using same window: Open new terminal (Ctrl + Shift + `)
- If separate window: Open folder `rideshare`

#### 2.2 Navigate to Frontend
```bash
cd C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare
```

#### 2.3 Install Dependencies (First Time Only)
```bash
npm install
```

#### 2.4 Start Frontend Server
```bash
npm run dev
```

✅ **Frontend running at:** `http://localhost:3000`

**Keep this terminal running!**

---

## 🌐 Accessing the Application

### Frontend (User Interface)
Open browser: **http://localhost:3000**

**Pages:**
- `/` - Landing page
- `/driver/post` - Post a trip
- `/passenger/search` - Find rides
- `/dashboard` - User dashboard (after login)

### Backend (API & Admin)
**API Base:** `http://localhost:8000/api/`

**Admin Panel:** `http://localhost:8000/admin/`
- Login with superuser credentials
- Manage users, trips, bookings

---

## 📊 VS Code Terminal Layout

### Recommended Setup

```
┌─────────────────────────────────────────┐
│  VS Code Window                         │
├─────────────────────────────────────────┤
│  Explorer | Editor | ...                │
│                                         │
│  [Your code files here]                 │
│                                         │
├─────────────────────────────────────────┤
│  Terminal 1: Backend                    │
│  > python manage.py runserver           │
│  Django version 5.0, using settings...  │
│  Starting development server at         │
│  http://127.0.0.1:8000/                 │
├─────────────────────────────────────────┤
│  Terminal 2: Frontend                   │
│  > npm run dev                          │
│  ▲ Next.js 16.0.4                       │
│  - Local: http://localhost:3000         │
└─────────────────────────────────────────┘
```

### How to Split Terminals

1. Click **+** icon in terminal to add new terminal
2. Or press **Ctrl + Shift + `**
3. Use dropdown to switch between terminals
4. Or click split icon to view side-by-side

---

## 🔄 Complete Workflow

### First Time Setup

```bash
# 1. Backend Setup
cd C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare-backend
pip install Django djangorestframework djangorestframework-simplejwt django-cors-headers python-decouple
python manage.py migrate
python manage.py createsuperuser  # Optional

# 2. Frontend Setup
cd C:\Users\aryan\OneDrive\Desktop\Antigravity\rideshare
npm install
```

### Daily Development

```bash
# Terminal 1 - Backend
cd rideshare-backend
python manage.py runserver

# Terminal 2 - Frontend  
cd rideshare
npm run dev
```

### Testing the Full Stack

1. **Start both servers** (backend + frontend)
2. **Open browser:** `http://localhost:3000`
3. **Click "Sign up"**
4. **Choose role:** Driver or Passenger
5. **Fill form** and submit
6. **Check backend:** API creates user in database
7. **Check frontend:** Redirects to dashboard

---

## 🛑 Stopping the Servers

### Stop Backend
- Go to backend terminal
- Press **Ctrl + C**

### Stop Frontend
- Go to frontend terminal
- Press **Ctrl + C**
- Type `Y` if prompted

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'rest_framework'`
```bash
pip install djangorestframework
```

**Problem:** `django.db.utils.OperationalError: no such table`
```bash
python manage.py migrate
```

**Problem:** Port 8000 already in use
```bash
python manage.py runserver 8001
```

### Frontend Issues

**Problem:** `Module not found: Can't resolve '@/lib/context/AuthContext'`
```bash
# Make sure all files are created
# Check file exists: src/lib/context/AuthContext.tsx
```

**Problem:** Port 3000 already in use
```bash
npm run dev -- -p 3001
```

**Problem:** Build errors
```bash
# Delete .next folder and rebuild
rmdir /s /q .next
npm run dev
```

---

## 📝 VS Code Extensions (Recommended)

### For Frontend (TypeScript/React)
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **Prettier - Code formatter**
- **ESLint**

### For Backend (Python/Django)
- **Python** (Microsoft)
- **Django** (Baptiste Darthenay)
- **Python Indent**
- **autoDocstring**

### General
- **GitLens**
- **Path Intellisense**
- **Auto Rename Tag**

---

## 🔍 Checking if Everything Works

### Backend Health Check

1. Open browser: `http://localhost:8000/admin/`
2. Should see Django admin login page ✅

### Frontend Health Check

1. Open browser: `http://localhost:3000`
2. Should see RideShare landing page ✅

### API Health Check

1. Open browser: `http://localhost:8000/api/auth/register/`
2. Should see Django REST Framework browsable API ✅

---

## 📂 File Structure Reference

### Backend Files
```
rideshare-backend/
├── manage.py              # Django management script
├── db.sqlite3            # Database (created after migrate)
├── rideshare_api/
│   ├── settings.py       # Django settings
│   └── urls.py           # Main URL routing
├── users/
│   ├── models.py         # User models
│   ├── views.py          # Auth endpoints
│   └── serializers.py    # Data serialization
└── trips/
    ├── models.py         # Trip/Booking models
    ├── views.py          # Trip endpoints
    └── serializers.py    # Data serialization
```

### Frontend Files
```
rideshare/
├── package.json          # Dependencies
├── src/
│   ├── app/
│   │   ├── page.tsx      # Landing page
│   │   ├── dashboard/    # Dashboard
│   │   ├── driver/       # Driver pages
│   │   └── passenger/    # Passenger pages
│   ├── components/
│   │   ├── auth/         # Auth modals
│   │   ├── layout/       # Navbar
│   │   └── ui/           # UI components
│   └── lib/
│       └── context/      # Auth context
└── public/               # Static files
```

---

## ✅ Success Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend server running on port 3000
- [ ] Can access landing page
- [ ] Can open signup modal
- [ ] Can register as driver/passenger
- [ ] Can see dashboard after signup
- [ ] Backend admin panel accessible

---

## 🎉 You're All Set!

**Both servers running?** → Start developing!

**Need to test?** → Use the signup flow

**Need to debug?** → Check both terminal outputs

**Need to stop?** → Ctrl+C in both terminals

---

## 💡 Pro Tips

1. **Use VS Code's split terminal** to see both servers at once
2. **Keep both servers running** while developing
3. **Check terminal output** for errors
4. **Use browser DevTools** (F12) to debug frontend
5. **Use Django admin** to inspect database
6. **Hot reload works** - changes auto-refresh!

---

**Happy Coding! 🚀**
