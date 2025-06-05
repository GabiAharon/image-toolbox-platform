import React, { useState, useCallback, useRef } from 'react';
import { Download, RotateCcw, RefreshCw, FileType, Zap } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

const FormatConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [convertedImages, setConvertedImages] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState(['webp']);
  const [compressionQuality, setCompressionQuality] = useState(90);
  const canvasRef = useRef();

  const supportedFormats = [
    { 
      value: 'webp', 
      label: 'WebP', 
      description: 'פורמט מודרני עם דחיסה מעולה',
      quality: true,
      mimeType: 'image/webp'
    },
    { 
      value: 'jpeg', 
      label: 'JPEG', 
      description: 'פורמט סטנדרטי לתמונות',
      quality: true,
      mimeType: 'image/jpeg'
    },
    { 
      value: 'png', 
      label: 'PNG', 
      description: 'פורמט ללא הפסד איכות',
      quality: false,
      mimeType: 'image/png'
    },
    { 
      value: 'bmp', 
      label: 'BMP', 
      description: 'פורמט בסיסי ללא דחיסה',
      quality: false,
      mimeType: 'image/bmp'
    }
  ];

  const handleImageSelect = useCallback((imageData) => {
    if (imageData) {
      setOriginalImage(imageData);
      setConvertedImages([]);
    }
  }, []);

  const convertToFormat = async (format) => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Clear canvas and draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Convert to blob
        const quality = format.quality ? compressionQuality / 100 : undefined;
        canvas.toBlob((blob) => {
          if (blob) {
            resolve({
              format: format.value,
              label: format.label,
              blob,
              url: URL.createObjectURL(blob),
              size: blob.size,
              mimeType: format.mimeType
            });
          }
        }, format.mimeType, quality);
      };

      img.src = originalImage.url;
    });
  };

  const handleConvertImages = async () => {
    if (!originalImage || selectedFormats.length === 0) return;

    setIsConverting(true);
    setConvertedImages([]);

    try {
      const promises = selectedFormats.map(formatValue => {
        const format = supportedFormats.find(f => f.value === formatValue);
        return convertToFormat(format);
      });

      const results = await Promise.all(promises);
      setConvertedImages(results);
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const downloadImage = (convertedImage) => {
    const link = document.createElement('a');
    link.href = convertedImage.url;
    const nameWithoutExt = originalImage.name.replace(/\.[^/.]+$/, '');
    link.download = `${nameWithoutExt}.${convertedImage.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAllImages = () => {
    convertedImages.forEach(img => downloadImage(img));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const calculateSavings = (originalSize, newSize) => {
    const savings = ((originalSize - newSize) / originalSize) * 100;
    return savings > 0 ? `חיסכון ${Math.round(savings)}%` : `גדול ב-${Math.round(Math.abs(savings))}%`;
  };

  const resetTool = () => {
    setOriginalImage(null);
    setConvertedImages([]);
    setSelectedFormats(['webp']);
    setCompressionQuality(90);
    setIsConverting(false);
  };

  return (
    <div className="tool-workspace">
      <div className="workspace-header">
        <h2 className="workspace-title">🔄 המרת פורמט</h2>
        <div className="workspace-actions">
          <button 
            onClick={resetTool}
            className="btn btn-secondary"
            disabled={isConverting}
          >
            <RotateCcw size={16} />
            איפוס
          </button>
        </div>
      </div>

      <div className="tool-content">
        <div className="upload-section">
          <ImageUpload 
            onImageSelect={handleImageSelect}
            acceptedFormats={['image/*']}
            multiple={false}
          />
        </div>

        {originalImage && (
          <>
            <div className="conversion-settings">
              <div className="format-selection">
                <h3>
                  <FileType size={20} />
                  בחר פורמטים להמרה
                </h3>
                <div className="format-grid">
                  {supportedFormats.map(format => (
                    <label key={format.value} className="format-option">
                      <input
                        type="checkbox"
                        value={format.value}
                        checked={selectedFormats.includes(format.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFormats(prev => [...prev, format.value]);
                          } else {
                            setSelectedFormats(prev => prev.filter(f => f !== format.value));
                          }
                        }}
                        className="format-checkbox"
                      />
                      <div className="format-card">
                        <div className="format-header">
                          <span className="format-label">{format.label}</span>
                          {format.quality && (
                            <span className="quality-badge">איכות</span>
                          )}
                        </div>
                        <p className="format-description">{format.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="quality-settings">
                <h3>הגדרות איכות</h3>
                <div className="quality-control">
                  <label className="quality-label">
                    איכות דחיסה (JPEG/WebP)
                    <span className="quality-value">{compressionQuality}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={compressionQuality}
                    onChange={(e) => setCompressionQuality(parseInt(e.target.value))}
                    className="quality-slider"
                  />
                  <div className="quality-info">
                    <span>איכות נמוכה</span>
                    <span>איכות גבוהה</span>
                  </div>
                </div>
              </div>

              <div className="conversion-actions">
                <button
                  onClick={handleConvertImages}
                  disabled={isConverting || selectedFormats.length === 0}
                  className="btn btn-primary btn-lg"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw className="animate-spin" size={20} />
                      ממיר...
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      המר לפורמטים נבחרים
                    </>
                  )}
                </button>
                
                {selectedFormats.length > 0 && !isConverting && (
                  <p style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.9rem', 
                    color: 'var(--text-secondary)',
                    textAlign: 'center' 
                  }}>
                    {selectedFormats.length === 1 
                      ? `מוכן להמרה לפורמט ${supportedFormats.find(f => f.value === selectedFormats[0])?.label}`
                      : `מוכן להמרה ל-${selectedFormats.length} פורמטים`
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="original-info">
              <div className="image-info-card">
                <h4>תמונה מקורית</h4>
                <div className="info-details">
                  <span>שם: {originalImage.name}</span>
                  <span>גודל: {formatFileSize(originalImage.size)}</span>
                  <span>פורמט: {originalImage.file.type}</span>
                </div>
              </div>
            </div>

            {convertedImages.length > 0 && (
              <div className="conversion-results">
                <div className="results-header">
                  <h3>תוצאות המרה</h3>
                  <button
                    onClick={downloadAllImages}
                    className="btn btn-success"
                  >
                    <Download size={16} />
                    הורד הכל
                  </button>
                </div>
                
                <div className="results-grid">
                  {convertedImages.map((img, index) => (
                    <div key={index} className="result-card">
                      <div className="result-header">
                        <h4>{img.label}</h4>
                        <span className="savings-badge">
                          {calculateSavings(originalImage.size, img.size)}
                        </span>
                      </div>
                      
                      <div className="result-preview">
                        <img 
                          src={img.url} 
                          alt={`המרה ל-${img.label}`}
                          className="result-image"
                        />
                      </div>
                      
                      <div className="result-info">
                        <div className="size-comparison">
                          <span>גודל חדש: {formatFileSize(img.size)}</span>
                          <span>מקורי: {formatFileSize(originalImage.size)}</span>
                        </div>
                        
                        <button
                          onClick={() => downloadImage(img)}
                          className="btn btn-primary btn-sm"
                        >
                          <Download size={14} />
                          הורד {img.label}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default FormatConverter; 