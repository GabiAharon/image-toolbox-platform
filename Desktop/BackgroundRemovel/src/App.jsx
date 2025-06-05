import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EnhancedBackgroundRemoval from './tools/EnhancedBackgroundRemoval';
import ImageCrop from './tools/ImageCrop';
import AdvancedFilters from './tools/AdvancedFilters';
import FormatConverter from './tools/FormatConverter';

function App() {
  const [currentTool, setCurrentTool] = useState('background-removal');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set theme on mount and when changed
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderToolContent = () => {
    switch (currentTool) {
      case 'background-removal':
        return <EnhancedBackgroundRemoval />;
      case 'image-crop':
        return <ImageCrop />;
      case 'filters':
        return <AdvancedFilters />;
      case 'format-converter':
        return <FormatConverter />;
      default:
        return <ToolsOverview onToolSelect={setCurrentTool} />;
    }
  };

  return (
    <div className="app-container">
      <Header 
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        isDarkMode={isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <main className="main-content">
        {renderToolContent()}
      </main>
    </div>
  );
}

// Tools overview component
const ToolsOverview = ({ onToolSelect }) => {
  const tools = [
    {
      id: 'background-removal',
      name: 'הסרת רקע',
      icon: '🎭',
      description: 'הסר רקע מתמונות באמצעות AI מתקדם',
      features: ['AI מתקדם', 'תוצאות מדויקות', 'תמיכה בכל הפורמטים'],
      status: 'ready'
    },
    {
      id: 'image-crop',
      name: 'חיתוך תמונה',
      icon: '✂️',
      description: 'חתוך תמונות ביחסי גובה-רוחב שונים',
      features: ['יחסים מוגדרים מראש', 'חיתוך חופשי', 'תצוגה מקדימה'],
      status: 'ready'
    },
    {
      id: 'filters',
      name: 'פילטרים',
      icon: '🎨',
      description: 'החל פילטרים ואפקטים מתקדמים',
      features: ['פילטרים מוכנים', 'התאמה ידנית', 'תצוגה מקדימה'],
      status: 'ready'
    },
    {
      id: 'format-converter',
      name: 'המרת פורמט',
      icon: '🔄',
      description: 'המר בין פורמטי תמונה שונים',
      features: ['WebP, JPEG, PNG, BMP', 'אופטימיזציה', 'בקרת איכות'],
      status: 'ready'
    }
  ];

  return (
    <div className="tools-overview">
      <div className="overview-header">
        <h1>🖼️ פלטפורמת עיצוב תמונות</h1>
        <p>כלים מתקדמים לעריכה ועיבוד תמונות</p>
      </div>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <div 
            key={tool.id} 
            className="tool-card"
            onClick={() => onToolSelect(tool.id)}
          >
            <div className="tool-card-header">
              <div className="tool-icon">
                <span style={{ fontSize: '24px' }}>{tool.icon}</span>
              </div>
              <div>
                <h3 className="tool-title">{tool.name}</h3>
              </div>
            </div>
            <p className="tool-description">{tool.description}</p>
            <ul className="tool-features">
              {tool.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App; 