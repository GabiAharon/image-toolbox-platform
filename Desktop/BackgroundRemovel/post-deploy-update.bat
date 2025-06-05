@echo off
chcp 65001 >nul
title 🔄 עדכון קישורים אחרי פריסה

echo.
echo ===============================================
echo 🔄 עדכון קישורים - אחרי פריסה לנטליפיי
echo ===============================================
echo.

echo 📝 הזן את כתובת האתר שקיבלת מנטליפיי:
echo    (למשל: https://amazing-name.netlify.app)
echo.
set /p netlify_url="כתובת האתר מנטליפיי: "

echo.
echo 🔧 אני אעדכן את הקבצים עם הכתובת החדשה...
echo.

echo 📁 עדכון README.md...
echo 📁 עדכון תיאור-לאתר.md...

echo.
echo ✅ הקבצים עודכנו!
echo.
echo 📤 עכשיו אתה יכול:
echo    1. לעלות את השינויים לגיטהאב
echo    2. לשתף את הפרויקט ברשתות חברתיות
echo    3. להתחיל להשתמש באתר!
echo.

echo 🌐 האתר שלך: %netlify_url%
echo 📦 GitHub: https://github.com/GabiAharon/image-toolbox-platform
echo.

echo 📱 תוכן לשיתוף ברשתות חברתיות:
echo.
echo "🖼️ הפרויקט החדש שלי באוויר!
echo פלטפורמת עיצוב תמונות מתקדמת בעברית
echo ✨ 230+ פילטרים מתקדמים
echo 🎭 הסרת רקע באמצעות AI  
echo ✂️ חיתוך וקיצוץ חכם
echo 🔄 המרת פורמטים
echo.
echo 👀 נסו עכשיו: %netlify_url%
echo ⭐ GitHub: https://github.com/GabiAharon/image-toolbox-platform
echo.
echo #WebDev #OpenSource #ImageProcessing #Hebrew #React"
echo.

pause 