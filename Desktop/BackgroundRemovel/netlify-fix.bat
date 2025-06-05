@echo off
chcp 65001 >nul
title 🔧 תיקון פריסה לנטליפיי

echo.
echo ===============================================
echo 🔧 תיקון פריסה לנטליפיי - עם הגדרות חדשות
echo ===============================================
echo.

echo ✅ הוספתי קבצים לתיקון הבעיה:
echo    📁 .nvmrc - Node.js גרסה 18
echo    📁 netlify.toml - הגדרות build נכונות
echo.

echo 🔄 מה לעשות עכשיו בנטליפיי:
echo.
echo אפשרות 1 - Retry Deploy:
echo    1️⃣  היכנס לאתר הנטליפיי שלך
echo    2️⃣  לחץ "Deploys" בתפריט העליון
echo    3️⃣  לחץ "Trigger deploy" → "Deploy site"
echo.

echo אפשרות 2 - הגדרות ידניות:
echo    1️⃣  Site settings → Build ^& deploy
echo    2️⃣  Environment variables → Edit variables
echo    3️⃣  הוסף: NODE_VERSION = 18
echo    4️⃣  שמור ועשה Deploy חדש
echo.

echo אפשרות 3 - יצירת אתר חדש:
echo    1️⃣  New site from Git
echo    2️⃣  בחר GitHub → image-toolbox-platform
echo    3️⃣  השאר הכל כמו שזה:
echo         Branch: master (לא main!)
echo         Build command: npm run build
echo         Publish directory: dist
echo    4️⃣  Deploy site!
echo.

echo 🌐 הקבצים החדשים כבר ב-GitHub ומוכנים!
echo.

set /p choice="איזה אפשרות תרצה לנסות? (1/2/3): "

if "%choice%"=="1" (
    echo 🚀 פותח נטליפיי לRetry Deploy...
    start "" "https://app.netlify.com/teams/gabiah/sites"
) else if "%choice%"=="2" (
    echo 🛠️ פותח הגדרות Site...
    start "" "https://app.netlify.com/teams/gabiah/sites"
) else if "%choice%"=="3" (
    echo 🆕 פותח יצירת אתר חדש...
    start "" "https://app.netlify.com/start"
) else (
    echo 💡 תוכל לעשות זה ידנית בכתובת: https://app.netlify.com
)

echo.
echo 🔍 אם עדיין יש בעיה, חפש ב-Deploy log את השגיאה ותגיד לי!
pause 