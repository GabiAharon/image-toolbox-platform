import React from 'react';
import { ImageIcon, Settings, Sun, Moon, Globe } from 'lucide-react';

const Header = ({ currentTool, onToolChange, isDarkMode, onThemeToggle }) => {
  const tools = [
    { id: 'background-removal', name: 'הסרת רקע', icon: '🎭' },
    { id: 'image-crop', name: 'חיתוך תמונה', icon: '✂️' },
    { id: 'filters', name: 'פילטרים', icon: '🎨' },
    { id: 'format-converter', name: 'המרת פורמט', icon: '🔄' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <ImageIcon size={20} />
          </div>
          <span>פלטפורמת עיצוב תמונות</span>
        </div>
        
        <nav className="nav-tabs">
          {tools.map(tool => (
            <button
              key={tool.id}
              className={`nav-tab ${currentTool === tool.id ? 'active' : ''}`}
              onClick={() => onToolChange(tool.id)}
            >
              <span className="tool-emoji">{tool.icon}</span>
              {tool.name}
            </button>
          ))}
        </nav>
        
        <div className="header-actions">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onThemeToggle}
            title={isDarkMode ? 'מצב בהיר' : 'מצב כהה'}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="btn btn-secondary btn-sm" title="הגדרות">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 