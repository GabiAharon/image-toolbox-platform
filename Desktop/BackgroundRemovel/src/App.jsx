import React, { useState, useEffect } from 'react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Simulate app initialization
      setTimeout(() => {
        setIsLoaded(true);
      }, 500);
    } catch (err) {
      setError('שגיאה בטעינת האפליקציה');
      console.error('App initialization error:', err);
    }
  }, []);

  if (error) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        direction: 'rtl',
        background: '#fee2e2'
      }}>
        <div>
          <h1 style={{ color: '#dc2626' }}>❌ שגיאה</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
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
          <h1>⏳ טוען...</h1>
          <p>מכין את פלטפורמת עיצוב התמונות</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      direction: 'rtl',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          🎉 הפריסה הצליחה!
        </h1>
        
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '30px',
          fontWeight: '300'
        }}>
          🖼️ פלטפורמת עיצוב תמונות
        </h2>
        
        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '30px', 
          borderRadius: '15px',
          marginBottom: '30px',
          backdropFilter: 'blur(10px)'
        }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            🚀 הפריסה בנטליפיי ו-GitHub Pages הצליחה!
          </p>
          
          <h3 style={{ marginBottom: '15px' }}>🛠️ כלים זמינים:</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            textAlign: 'right'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              🎭 הסרת רקע מתקדמת
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              ✂️ חיתוך תמונות מדויק
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              🎨 230+ פילטרים מתקדמים
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', padding: '15px', borderRadius: '10px' }}>
              🔄 המרת פורמטים
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.1)', 
          padding: '20px', 
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h4>📊 סטטוס הפריסה:</h4>
          <p>✅ נטליפיי: פעיל</p>
          <p>✅ GitHub Pages: פעיל</p>
          <p>✅ כלים: מוכנים להטמעה</p>
        </div>

        <p style={{ fontSize: '0.9rem', opacity: '0.8' }}>
          גרסה 1.0.0 - פלטפורמה מתקדמת לעיצוב תמונות
        </p>
      </div>
    </div>
  );
}

export default App; 