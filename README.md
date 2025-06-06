# 🖼️ פלטפורמת עיצוב תמונות - Image Toolbox Platform

[![Deploy to Netlify](https://img.shields.io/badge/Deploy%20to-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/image-toolbox-platform)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

> **🌟 [צפה בדמו החי](https://your-app.netlify.app)**

פלטפורמה מקיפה ומתקדמת לעריכה ועיבוד תמונות בעברית, בהשראת פרויקט הקוד הפתוח [ImageToolbox](https://github.com/T8RIN/ImageToolbox). מציעה למעלה מ-230 פילטרים מתקדמים ושיטות הסרת רקע מרובות עם GPU acceleration וממשק משתמש מודרני.

## ✨ תכונות עיקריות

### 🛠️ כלים זמינים

#### 🎭 הסרת רקע מתקדמת (בהשראת ImageToolbox)
- 6 שיטות הסרת רקע שונות: AI אוטומטי, AI לאנשים, AI לאובייקטים, זיהוי קצוות, סף צבע ועידון ידני
- מודלים מתמחים לסוגי תמונות שונים
- הגדרות מתקדמות: סף זיהוי, החלקת קצוות, שחיקה והתרחבות
- אינדיקטור התקדמות מפורט עם בחירת מעבד (CPU/GPU)

#### ✂️ חיתוך תמונה
- חיתוך תמונות עם יחסי גובה-רוחב מוגדרים מראש
- חיתוך חופשי ללא הגבלות
- תצוגה מקדימה בזמן אמת
- שמירה באיכות מקסימלית

#### 🎨 פילטרים מתקדמים (בהשראת ImageToolbox - 230+ פילטרים)
- 10 פילטרים מוכנים מראש מתקדמים (וינטאג', דרמטי, ציור שמן, סקיצה, גלויה ישנה ועוד)
- 9 קטגוריות פילטרים: התאמות בסיסיות, צבעים, חדות וטשטוש, אפקטים אמנותיים, זיהוי קווים, עיוותים, רעש וטקסטורה, אפקטי צבע ומורפולוגיה
- עיבוד GPU מתקדם לביצועים מקסימליים
- אלגוריתמים מתקדמים: גמא, חיוניות, סובל, לפלסיאן, מערבולת, פוסטריזציה ועוד

#### 🔄 המרת פורמט
- המרה בין פורמטי התמונה השונים (WebP, JPEG, PNG, BMP)
- בקרת איכות דחיסה מתקדמת
- השוואת גדלי קבצים ואחוזי חיסכון
- המרה למספר פורמטים בו-זמנית

### 🚀 כלים נוספים בפיתוח

#### 📝 זיהוי טקסט (OCR)
- זיהוי וחילוץ טקסט מתמונות
- תמיכה בעברית ואנגלית
- דיוק גבוה ועריכת טקסט

#### 📱 QR וברקוד
- יצירה וסריקה של קודי QR
- תמיכה ב-13 פורמטי ברקוד
- עיצוב מותאם אישית

#### 🎨 כלי צבעים
- בחירת צבעים מתמונות
- יצירת פלטות צבעים
- ערבוב והרמוניות צבעים

#### ⚖️ השוואת תמונות
- השוואה צד לצד
- זיהוי הבדלים אוטומטי
- מדדי דמיון

#### 🖼️ קולאז'
- יצירת קולאז' מתמונות מרובות
- למעלה מ-180 תבניות
- התאמה אישית מלאה

#### 🏷️ סימן מים
- הוספת טקסט או לוגו כסימן מים
- שקיפות מתכווננת
- מיקום גמיש

## 🎨 עיצוב ו-UX

- ממשק משתמש מודרני ואינטואיטיבי
- תמיכה במצב כהה ובהיר
- עיצוב רספונסיבי למובייל וטאבלט
- אנימציות חלקות ומעברים יפים
- תמיכה בעברית וכיוון RTL

## 🔧 טכנולוגיות

- **React 18** - ספריית JavaScript מתקדמת
- **Vite** - כלי בנייה מהיר ומודרני
- **Lucide React** - אייקונים מודרניים
- **React Dropzone** - העלאת קבצים בגרירה
- **React Image Crop** - חיתוך תמונות אינטראקטיבי
- **Background Removal AI** - הסרת רקע מתקדמת עם מודלים מרובים
- **GPU.js** - עיבוד מקבילי GPU לפילטרים מתקדמים
- **CSS Variables** - עיצוב דינמי וגמיש

## 🚀 התקנה והפעלה

### דרישות מקדימות
- Node.js 16+ 
- npm או yarn

### שלבי התקנה

1. **שכפול הפרויקט**
```bash
git clone [repository-url]
cd BackgroundRemovel
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הפעלת שרת הפיתוח**
```bash
npm run dev
```

4. **פתיחה בדפדפן**
```
http://localhost:3000
```

### סקריפטים זמינים

```bash
# פיתוח
npm run dev

# בנייה לפרודקשן
npm run build

# תצוגה מקדימה של הבנייה
npm run preview

# בדיקת קוד
npm run lint
```

## 📱 שימוש

### העלאת תמונות
1. גרור תמונה לאזור ההעלאה או לחץ לבחירה
2. התמונה תוצג עם תצוגה מקדימה
3. בחר את הכלי הרצוי מהתפריט העליון

### הסרת רקע
1. העלה תמונה
2. לחץ על "הסר רקע"
3. המתן לסיום העיבוד
4. הורד את התוצאה

### חיתוך תמונה
1. העלה תמונה
2. בחר יחס גובה-רוחב או השאר חופשי
3. גרור את מסגרת החיתוך
4. לחץ "חתוך תמונה"
5. הורד את התוצאה

### פילטרים
1. העלה תמונה
2. בחר פילטר מוכן או התאם ידנית
3. צפה בתצוגה מקדימה
4. הורד את התוצאה

### המרת פורמט
1. העלה תמונה
2. בחר פורמטים יעד
3. התאם איכות דחיסה
4. לחץ "המר"
5. הורד את התוצאות

## 🌍 פריסה לאינטרנט

### Vercel (מומלץ)
1. העלה את הפרויקט ל-GitHub
2. חבר ל-Vercel
3. פרוס אוטומטית

### Netlify
1. בנה את הפרויקט: `npm run build`
2. העלה את תיקיית `dist`

### GitHub Pages
1. הוסף סקריפט deploy ל-package.json
2. בנה ופרוס: `npm run deploy`

## 🔒 אבטחה ופרטיות

- כל העיבוד מתבצע בצד הלקוח (בדפדפן)
- אין העלאה של תמונות לשרתים חיצוניים
- פרטיות מלאה - התמונות שלך נשארות אצלך
- קוד פתוח וניתן לביקורת

## 🤝 תרומה לפרויקט

אנו מזמינים תרומות לפרויקט!

### איך לתרום
1. עשה Fork לפרויקט
2. צור branch חדש: `git checkout -b feature/amazing-feature`
3. עשה commit: `git commit -m 'Add amazing feature'`
4. עשה push: `git push origin feature/amazing-feature`
5. פתח Pull Request

### הנחיות תרומה
- עקוב אחר הסטנדרטים הקיימים
- הוסף תיעוד למאפיינים חדשים
- בדוק שהקוד עובד על מכשירים שונים
- שמור על עקביות בעיצוב

## 📄 רישיון

פרויקט זה מופץ תחת רישיון MIT. ראה קובץ `LICENSE` לפרטים נוספים.

## 🐛 דיווח על באגים

נתקלת בבעיה? אנא פתח issue ב-GitHub עם:
- תיאור הבעיה
- שלבים לשחזור
- צילומי מסך (אם רלוונטי)
- מידע על הדפדפן והמערכת

## 📞 יצירת קשר

יש לך שאלות או הצעות? אנחנו כאן לעזור!
- פתח issue ב-GitHub
- שלח אימייל למפתחים

## 🙏 תודות

תודה מיוחדת ל:
- [IMG.LY](https://img.ly/) על ספריית הסרת הרקע
- קהילת React על הכלים המדהימים
- כל התורמים לפרויקט

---

**🎯 המטרה שלנו**: ליצור את פלטפורמת עריכת התמונות הטובה והנגישה ביותר, בחינם ובקוד פתוח.

**⭐ אהבת את הפרויקט? תן לנו כוכב ב-GitHub!** 