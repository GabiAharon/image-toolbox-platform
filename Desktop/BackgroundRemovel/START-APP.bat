@echo off
title Background Removal App
cls
echo.
echo ========================================
echo     Background Removal App Launcher
echo ========================================
echo.
echo Installing packages...
npm install --silent
echo.
echo Starting development server...
echo.
echo Open your browser and go to:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.
npm run dev
echo.
echo Server stopped.
pause 