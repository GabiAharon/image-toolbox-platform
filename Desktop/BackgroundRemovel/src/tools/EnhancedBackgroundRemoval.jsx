import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Download, RotateCcw, Zap, Settings, Wand2, Layers, Cpu } from 'lucide-react';
import { removeBackground } from '@imgly/background-removal';
import ImageUpload from '../components/ImageUpload';

const EnhancedBackgroundRemoval = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState('');
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLivePreview, setIsLivePreview] = useState(false);
  const [progress, setProgress] = useState(0);
  const [method, setMethod] = useState('ai-auto');
  const [refinementSettings, setRefinementSettings] = useState({
    edgeSmoothing: 0,
    featherRadius: 0,
    threshold: 0.5,
    erosion: 0,
    dilation: 0,
    blur: 0
  });
  const canvasRef = useRef();
  const previewTimeoutRef = useRef();

  // Enhanced background removal methods inspired by ImageToolbox
  const removalMethods = [
    {
      id: 'ai-auto',
      name: 'AI אוטומטי',
      description: 'הסרת רקע חכמה באמצעות בינה מלאכותית',
      icon: '🤖',
      accuracy: 'גבוהה מאוד',
      speed: 'בינונית'
    },
    {
      id: 'ai-person',
      name: 'AI לאנשים',
      description: 'מותאם במיוחד לזיהוי אנשים',
      icon: '👤',
      accuracy: 'מצוינת לאנשים',
      speed: 'בינונית'
    },
    {
      id: 'ai-object',
      name: 'AI לאובייקטים',
      description: 'מותאם לזיהוי חפצים ופריטים',
      icon: '📦',
      accuracy: 'טובה לחפצים',
      speed: 'בינונית'
    },
    {
      id: 'edge-detection',
      name: 'זיהוי קצוות',
      description: 'מבוסס על זיהוי קצוות והבדלי צבע',
      icon: '🔍',
      accuracy: 'בינונית',
      speed: 'מהירה'
    },
    {
      id: 'color-threshold',
      name: 'סף צבע',
      description: 'הסרה על בסיס דמיון צבעים',
      icon: '🎨',
      accuracy: 'תלויה ברקע',
      speed: 'מהירה מאוד'
    },
    {
      id: 'manual-refine',
      name: 'עידון ידני',
      description: 'שילוב AI ועידון ידני מתקדם',
      icon: '✏️',
      accuracy: 'מותאמת אישית',
      speed: 'איטית'
    }
  ];

  const handleImageSelect = useCallback((imageData) => {
    if (imageData) {
      setOriginalImage(imageData);
      setProcessedImageUrl('');
      setPreviewImageUrl('');
      setProgress(0);
      setIsProcessing(false);
    }
  }, []);

  // Live preview for parameter changes (debounced)
  const generateLivePreview = useCallback(async () => {
    if (!originalImage || method === 'ai-auto' || method === 'ai-person' || method === 'ai-object') {
      return; // AI methods don't need live preview as they don't have adjustable parameters
    }

    setIsLivePreview(true);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        switch (method) {
          case 'edge-detection':
            await removeBackgroundEdgeDetectionPreview(img);
            break;
          case 'color-threshold':
            await removeBackgroundColorThresholdPreview(img);
            break;
          default:
            break;
        }
        setIsLivePreview(false);
      };

      img.src = originalImage.url;
    } catch (error) {
      console.error('Live preview failed:', error);
      setIsLivePreview(false);
    }
  }, [originalImage, method, refinementSettings]);

  // Debounced live preview
  useEffect(() => {
    if (!originalImage) return;

    // Clear previous timeout
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }

    // Set new timeout for debounced preview
    previewTimeoutRef.current = setTimeout(() => {
      generateLivePreview();
    }, 300); // 300ms delay

    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, [refinementSettings, method, generateLivePreview]);

  // Enhanced AI background removal with different models
  const removeBackgroundAI = async (imageUrl, selectedMethod) => {
    setIsProcessing(true);
    setProgress(10);

    try {
      let config = {
        progress: (key, current, total) => {
          const progressPercent = Math.round((current / total) * 90) + 10;
          setProgress(progressPercent);
        }
      };

      // Configure based on method
      switch (selectedMethod) {
        case 'ai-person':
          config.model = 'isnet_general_use'; // Better for people
          break;
        case 'ai-object':
          config.model = 'silueta'; // Better for objects
          break;
        case 'ai-auto':
        default:
          config.model = 'medium'; // Balanced approach
          break;
      }

      // Convert image URL to the right format for the library
      const blob = await removeBackground(imageUrl, config);
      const url = URL.createObjectURL(blob);
      setProcessedImageUrl(url);
      setProgress(100);

    } catch (error) {
      console.error('Background removal failed:', error);
      alert('שגיאה בהסרת הרקע. אנא נסה שוב או בחר שיטה אחרת.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Edge detection based background removal
  const removeBackgroundEdgeDetection = async (imageElement) => {
    setIsProcessing(true);
    setProgress(20);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    setProgress(40);

    // Apply edge detection (Sobel operator)
    const edgeData = new Uint8ClampedArray(data.length);
    
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < canvas.width - 1; x++) {
        const idx = (y * canvas.width + x) * 4;
        
        // Get surrounding pixels
        const gx = (
          -1 * data[((y-1) * canvas.width + (x-1)) * 4] +
          1 * data[((y-1) * canvas.width + (x+1)) * 4] +
          -2 * data[(y * canvas.width + (x-1)) * 4] +
          2 * data[(y * canvas.width + (x+1)) * 4] +
          -1 * data[((y+1) * canvas.width + (x-1)) * 4] +
          1 * data[((y+1) * canvas.width + (x+1)) * 4]
        );
        
        const gy = (
          -1 * data[((y-1) * canvas.width + (x-1)) * 4] +
          -2 * data[((y-1) * canvas.width + x) * 4] +
          -1 * data[((y-1) * canvas.width + (x+1)) * 4] +
          1 * data[((y+1) * canvas.width + (x-1)) * 4] +
          2 * data[((y+1) * canvas.width + x) * 4] +
          1 * data[((y+1) * canvas.width + (x+1)) * 4]
        );
        
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        
        edgeData[idx] = data[idx];
        edgeData[idx + 1] = data[idx + 1];
        edgeData[idx + 2] = data[idx + 2];
        edgeData[idx + 3] = magnitude > refinementSettings.threshold * 255 ? 255 : 0;
      }
    }

    setProgress(80);

    ctx.putImageData(new ImageData(edgeData, canvas.width, canvas.height), 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setProcessedImageUrl(url);
      }
      setProgress(100);
      setIsProcessing(false);
    }, 'image/png');
  };

  // Color threshold based removal
  const removeBackgroundColorThreshold = async (imageElement) => {
    setIsProcessing(true);
    setProgress(20);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    setProgress(50);

    // Sample background color from corners
    const corners = [
      [0, 0], [canvas.width - 1, 0], 
      [0, canvas.height - 1], [canvas.width - 1, canvas.height - 1]
    ];
    
    let avgR = 0, avgG = 0, avgB = 0;
    corners.forEach(([x, y]) => {
      const idx = (y * canvas.width + x) * 4;
      avgR += data[idx];
      avgG += data[idx + 1];
      avgB += data[idx + 2];
    });
    avgR /= corners.length;
    avgG /= corners.length;
    avgB /= corners.length;

    setProgress(70);

    // Remove similar colors
    const threshold = refinementSettings.threshold * 255;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const distance = Math.sqrt(
        Math.pow(r - avgR, 2) +
        Math.pow(g - avgG, 2) +
        Math.pow(b - avgB, 2)
      );
      
      if (distance < threshold) {
        data[i + 3] = 0; // Make transparent
      }
    }

    setProgress(90);

    ctx.putImageData(imageData, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setProcessedImageUrl(url);
      }
      setProgress(100);
      setIsProcessing(false);
    }, 'image/png');
  };

  // Apply post-processing refinements
  const applyRefinements = async (imageUrl) => {
    if (!canvasRef.current) return imageUrl;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Apply edge smoothing
        if (refinementSettings.edgeSmoothing > 0) {
          // Gaussian blur on alpha channel
          // Implementation would go here
        }

        // Apply erosion/dilation
        if (refinementSettings.erosion > 0 || refinementSettings.dilation > 0) {
          // Morphological operations
          // Implementation would go here
        }

        ctx.putImageData(imageData, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(URL.createObjectURL(blob));
          } else {
            resolve(imageUrl);
          }
        }, 'image/png');
      };

      img.src = imageUrl;
    });
  };

  // Preview versions that don't interfere with processing state
  const removeBackgroundEdgeDetectionPreview = async (imageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const edgeData = new Uint8ClampedArray(data.length);
    
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < canvas.width - 1; x++) {
        const idx = (y * canvas.width + x) * 4;
        
        const gx = (
          -1 * data[((y-1) * canvas.width + (x-1)) * 4] +
          1 * data[((y-1) * canvas.width + (x+1)) * 4] +
          -2 * data[(y * canvas.width + (x-1)) * 4] +
          2 * data[(y * canvas.width + (x+1)) * 4] +
          -1 * data[((y+1) * canvas.width + (x-1)) * 4] +
          1 * data[((y+1) * canvas.width + (x+1)) * 4]
        );
        
        const gy = (
          -1 * data[((y-1) * canvas.width + (x-1)) * 4] +
          -2 * data[((y-1) * canvas.width + x) * 4] +
          -1 * data[((y-1) * canvas.width + (x+1)) * 4] +
          1 * data[((y+1) * canvas.width + (x-1)) * 4] +
          2 * data[((y+1) * canvas.width + x) * 4] +
          1 * data[((y+1) * canvas.width + (x+1)) * 4]
        );
        
        const magnitude = Math.sqrt(gx * gx + gy * gy);
        
        edgeData[idx] = data[idx];
        edgeData[idx + 1] = data[idx + 1];
        edgeData[idx + 2] = data[idx + 2];
        edgeData[idx + 3] = magnitude > refinementSettings.threshold * 255 ? 255 : 0;
      }
    }

    ctx.putImageData(new ImageData(edgeData, canvas.width, canvas.height), 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setPreviewImageUrl(url);
      }
    }, 'image/png');
  };

  const removeBackgroundColorThresholdPreview = async (imageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample background color from corners
    const corners = [
      [0, 0], [canvas.width - 1, 0], 
      [0, canvas.height - 1], [canvas.width - 1, canvas.height - 1]
    ];
    
    let avgR = 0, avgG = 0, avgB = 0;
    corners.forEach(([x, y]) => {
      const idx = (y * canvas.width + x) * 4;
      avgR += data[idx];
      avgG += data[idx + 1];
      avgB += data[idx + 2];
    });
    avgR /= corners.length;
    avgG /= corners.length;
    avgB /= corners.length;

    // Remove similar colors
    const threshold = refinementSettings.threshold * 255;
    
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const distance = Math.sqrt(
        Math.pow(r - avgR, 2) +
        Math.pow(g - avgG, 2) +
        Math.pow(b - avgB, 2)
      );
      
      if (distance < threshold) {
        data[i + 3] = 0; // Make transparent
      }
    }

    ctx.putImageData(imageData, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        setPreviewImageUrl(url);
      }
    }, 'image/png');
  };

  const processImage = async () => {
    if (!originalImage) return;

    try {
      switch (method) {
        case 'ai-auto':
        case 'ai-person':
        case 'ai-object':
        case 'manual-refine':
          await removeBackgroundAI(originalImage.url, method);
          break;
        case 'edge-detection':
          const img1 = new Image();
          img1.crossOrigin = 'anonymous';
          img1.onload = () => removeBackgroundEdgeDetection(img1);
          img1.src = originalImage.url;
          break;
        case 'color-threshold':
          const img2 = new Image();
          img2.crossOrigin = 'anonymous';
          img2.onload = () => removeBackgroundColorThreshold(img2);
          img2.src = originalImage.url;
          break;
        default:
          await removeBackgroundAI(originalImage.url, 'ai-auto');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      setIsProcessing(false);
    }
  };

  const downloadProcessedImage = () => {
    if (!processedImageUrl) return;

    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `background-removed-${originalImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setOriginalImage(null);
    setProcessedImageUrl('');
    setPreviewImageUrl('');
    setProgress(0);
    setIsProcessing(false);
    setIsLivePreview(false);
    setMethod('ai-auto');
    setRefinementSettings({
      edgeSmoothing: 0,
      featherRadius: 0,
      threshold: 0.5,
      erosion: 0,
      dilation: 0,
      blur: 0
    });
    
    // Clear any pending timeouts
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
  };

  return (
    <div className="tool-workspace">
      <div className="workspace-header">
        <h2 className="workspace-title">🎭 הסרת רקע מתקדמת (בהשראת ImageToolbox)</h2>
        <div className="workspace-actions">
          <button 
            onClick={resetTool}
            className="btn btn-secondary"
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
            {/* Method Selection */}
            <div className="method-selection">
              <h3>
                <Settings size={20} />
                בחירת שיטת הסרה
              </h3>
              <div className="methods-grid">
                {removalMethods.map((methodOption) => (
                  <div 
                    key={methodOption.id}
                    className={`method-card ${method === methodOption.id ? 'selected' : ''}`}
                    onClick={() => setMethod(methodOption.id)}
                  >
                    <div className="method-icon">
                      <span style={{ fontSize: '24px' }}>{methodOption.icon}</span>
                    </div>
                    <div className="method-info">
                      <h4>{methodOption.name}</h4>
                      <p>{methodOption.description}</p>
                      <div className="method-stats">
                        <span className="accuracy">דיוק: {methodOption.accuracy}</span>
                        <span className="speed">מהירות: {methodOption.speed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Settings */}
            {(method === 'edge-detection' || method === 'color-threshold' || method === 'manual-refine') && (
              <div className="refinement-settings">
                <h3>
                  <Wand2 size={20} />
                  הגדרות מתקדמות
                </h3>
                <div className="settings-grid">
                  <div className="setting-control">
                    <label>
                      סף זיהוי
                      <span className="setting-value">{refinementSettings.threshold}</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={refinementSettings.threshold}
                      onChange={(e) => setRefinementSettings(prev => ({
                        ...prev,
                        threshold: parseFloat(e.target.value)
                      }))}
                    />
                  </div>

                  <div className="setting-control">
                    <label>
                      החלקת קצוות
                      <span className="setting-value">{refinementSettings.edgeSmoothing}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={refinementSettings.edgeSmoothing}
                      onChange={(e) => setRefinementSettings(prev => ({
                        ...prev,
                        edgeSmoothing: parseInt(e.target.value)
                      }))}
                    />
                  </div>

                  <div className="setting-control">
                    <label>
                      שחיקה
                      <span className="setting-value">{refinementSettings.erosion}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={refinementSettings.erosion}
                      onChange={(e) => setRefinementSettings(prev => ({
                        ...prev,
                        erosion: parseInt(e.target.value)
                      }))}
                    />
                  </div>

                  <div className="setting-control">
                    <label>
                      התרחבות
                      <span className="setting-value">{refinementSettings.dilation}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={refinementSettings.dilation}
                      onChange={(e) => setRefinementSettings(prev => ({
                        ...prev,
                        dilation: parseInt(e.target.value)
                      }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Process Button */}
            <div className="process-section">
              <button 
                onClick={processImage}
                className="btn btn-primary btn-large"
                disabled={isProcessing || isLivePreview}
              >
                {isProcessing ? (
                  <>
                    <Cpu size={20} className="spinning" />
                    מעבד... ({progress}%)
                  </>
                ) : isLivePreview ? (
                  <>
                    <Cpu size={20} className="spinning" />
                    מכין תצוגה מקדימה...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    {previewImageUrl ? 'החל שינויים סופיים' : 'הסר רקע'}
                  </>
                )}
              </button>
              
              {previewImageUrl && !isProcessing && (
                <p style={{ 
                  marginTop: '1rem', 
                  fontSize: '0.9rem', 
                  color: 'var(--text-secondary)',
                  textAlign: 'center' 
                }}>
                  משנה פרמטרים לתצוגה מקדימה בזמן אמת
                </p>
              )}
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  מעבד באמצעות {removalMethods.find(m => m.id === method)?.name}... {progress}%
                </p>
              </div>
            )}

            {/* Results */}
            <div className="results-section">
              <div className="image-comparison">
                <div className="image-container">
                  <h4>תמונה מקורית</h4>
                  <img src={originalImage.url} alt="Original" />
                </div>
                
                <div className="image-container">
                  <h4>רקע הוסר</h4>
                  {isProcessing ? (
                    <div className="placeholder">
                      <div className="spinner"></div>
                      <p>מעבד... ({progress}%)</p>
                    </div>
                  ) : processedImageUrl ? (
                    <img src={processedImageUrl} alt="Background removed" />
                  ) : previewImageUrl ? (
                    <div style={{ position: 'relative' }}>
                      <img src={previewImageUrl} alt="Live preview" />
                      <div style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px', 
                        background: 'rgba(0,0,0,0.7)', 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px' 
                      }}>
                        {isLivePreview ? 'מעדכן...' : 'תצוגה מקדימה'}
                      </div>
                    </div>
                  ) : (
                    <div className="placeholder">
                      <Layers size={48} />
                      <p>התמונה ללא רקע תופיע כאן</p>
                    </div>
                  )}
                </div>
              </div>

              {processedImageUrl && (
                <div className="download-section">
                  <button 
                    onClick={downloadProcessedImage}
                    className="btn btn-primary"
                  >
                    <Download size={16} />
                    הורד תמונה ללא רקע
                  </button>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}
      </div>
    </div>
  );
};

export default EnhancedBackgroundRemoval; 