import React from 'react';

function App() {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      direction: 'rtl'
    }}>
      <div>
        <h1 style={{ color: '#2563eb', marginBottom: '20px' }}>
          🎉 האפליקציה עובדת!
        </h1>
        <h2 style={{ color: '#1f2937' }}>
          🖼️ פלטפורמת עיצוב תמונות
        </h2>
        <p style={{ fontSize: '18px', color: '#6b7280', margin: '20px 0' }}>
          הפריסה בנטליפיי הצליחה בהצלחה! 🚀
        </p>
        <div style={{ 
          background: '#f3f4f6', 
          padding: '20px', 
          borderRadius: '10px',
          marginTop: '30px'
        }}>
          <h3>כלים זמינים:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>🎭 הסרת רקע מתקדמת</li>
            <li>✂️ חיתוך תמונות</li>
            <li>🎨 פילטרים מתקדמים (230+ אפקטים)</li>
            <li>🔄 המרת פורמטים</li>
          </ul>
        </div>
        <p style={{ marginTop: '30px', fontSize: '14px', color: '#9ca3af' }}>
          גרסת בדיקה - עם הכלים המלאים בקרוב
        </p>
      </div>
    </div>
  );
}

export default App; 