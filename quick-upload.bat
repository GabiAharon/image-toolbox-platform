@echo off
chcp 65001 >nul
title 🚀 העלאה מהירה לגיטהאב

echo.
echo ===============================================
echo 🖼️  העלאה לגיטהאב - GabiAharon/image-toolbox-platform
echo ===============================================
echo.

echo 📋 יש צורך להכין repository ב-GitHub לפני הרצת הסקריפט:
echo    1. היכנס ל-https://github.com/GabiAharon
echo    2. לחץ "New repository"
echo    3. שם: image-toolbox-platform
echo    4. תיאור: 🖼️ פלטפורמת עיצוב תמונות מתקדמת בעברית
echo    5. Public + MIT License
echo.

set /p ready="האם יצרת את ה-repository? (y/n): "
if /i "%ready%" neq "y" (
    echo ❌ צור repository קודם ואז הרץ שוב
    pause
    exit /b
)

echo.
echo 🔧 מאתחל Git...
git init

echo 📦 מוסיף קבצים...
git add .

echo 💬 יוצר commit...
git commit -m "🎉 Initial commit - פלטפורמת עיצוב תמונות מתקדמת בעברית"

echo 🔗 מחבר ל-repository...
git remote add origin https://github.com/GabiAharon/image-toolbox-platform.git

echo 🚀 מעלה לגיטהאב...
git branch -M main
git push -u origin main

echo.
echo ✅ הצלחנו! הפרויקט הועלה לגיטהאב
echo 🌐 קישור: https://github.com/GabiAharon/image-toolbox-platform
echo.
echo 📝 השלבים הבאים:
echo    1. היכנס ל-netlify.com
echo    2. Sign up עם GitHub
echo    3. "New site from Git" → בחר image-toolbox-platform
echo    4. Deploy!
echo.

pause 