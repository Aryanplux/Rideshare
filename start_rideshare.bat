@echo off
echo ========================================
echo   RideShare - Starting Both Servers
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "rideshare" (
    echo ERROR: Please run this script from the Antigravity folder
    echo Current directory: %CD%
    pause
    exit /b 1
)

echo [1/2] Starting Django Backend...
echo.
start "RideShare Backend" cmd /k "cd rideshare-backend && python manage.py runserver"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Next.js Frontend...
echo.
start "RideShare Frontend" cmd /k "cd rideshare && npm run dev"

echo.
echo ========================================
echo   Both servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Two new command windows will open.
echo Press Ctrl+C in each window to stop.
echo.
pause
