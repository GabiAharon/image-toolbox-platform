@echo off
chcp 65001 >nul
title 🌐 פריסה לנטליפיי - Image Toolbox Platform

echo.
echo ===============================================
echo 🌐 פריסה לנטליפיי - פלטפורמת עיצוב תמונות
echo ===============================================
echo.

echo 📋 הפרויקט כבר נבנה בהצלחה!
echo 📁 תיקיית dist מוכנה לפריסה
echo.

echo 🔗 קישורים שתצטרך:
echo    GitHub: https://github.com/GabiAharon/image-toolbox-platform
echo    Netlify: https://netlify.com
echo.

echo 📝 שלבי הפריסה (עוקב אחר ההוראות):
echo.
echo 1️⃣  פתח דפדפן ולך ל-https://netlify.com
echo 2️⃣  לחץ "Sign up" ובחר "GitHub"
echo 3️⃣  אשר הרשאות ל-Netlify
echo 4️⃣  לחץ "New site from Git"
echo 5️⃣  בחר "GitHub" 
echo 6️⃣  חפש "image-toolbox-platform" ולחץ עליו
echo 7️⃣  השאר הגדרות כמו שהן:
echo      Branch: main
echo      Build command: npm run build  
echo      Publish directory: dist
echo 8️⃣  לחץ "Deploy site"
echo.

echo ⏳ הפריסה תקח כ-2-3 דקות...
echo 🎯 תקבל כתובת כמו: amazing-name.netlify.app
echo.

echo 🔧 אופציונלי - שינוי שם האתר:
echo    Site settings → Domain management → Edit site name
echo    הציע שם: image-toolbox-platform
echo.

set /p continue="האם תרצה שאפתח את Netlify עבורך? (y/n): "
if /i "%continue%"=="y" (
    echo 🚀 פותח Netlify...
    start "" "https://netlify.com"
) else (
    echo 💡 אתה יכול לפתוח ידנית: https://netlify.com
)

echo.
echo 📱 אחרי הפריסה:
echo    ✅ בדוק שהאתר עובד
echo    ✅ נסה את כל הכלים
echo    ✅ שתף את הקישור!
echo.

echo 🎉 בהצלחה! הפרויקט שלך עומד להיות באוויר!
pause 