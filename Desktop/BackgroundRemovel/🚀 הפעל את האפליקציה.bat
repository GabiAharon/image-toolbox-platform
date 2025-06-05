@echo off
chcp 65001 >nul
title הפעלת אפליקציית הסרת רקע
cls
echo.
echo ===========================================
echo        🚀 מפעיל אפליקציית הסרת רקע 🚀
echo ===========================================
echo.
echo ⏳ מתקין חבילות...
npm install --silent
echo.
echo ✅ ההתקנה הושלמה!
echo.
echo 🌐 פותח שרת מקומי...
echo.
echo 📌 פתח דפדפן וגש ל: http://localhost:3000
echo.
echo 💡 כדי לעצור את השרת: לחץ Ctrl+C
echo.
echo ===========================================
echo.
npm run dev
echo.
echo �� השרת נעצר.
pause 