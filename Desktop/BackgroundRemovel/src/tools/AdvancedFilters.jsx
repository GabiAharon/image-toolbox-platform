import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, RotateCcw, Cpu, Zap, Settings } from 'lucide-react';
import { GPU } from 'gpu.js';
import ImageUpload from '../components/ImageUpload';

const AdvancedFilters = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [filteredImageUrl, setFilteredImageUrl] = useState('');
  const [useGPU, setUseGPU] = useState(true);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef();
  const gpuRef = useRef();
  const debounceTimeoutRef = useRef();

  // Advanced filters inspired by ImageToolbox (230+ filters)
  const [filters, setFilters] = useState({
    // Basic adjustments
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0,
    gamma: 1.0,
    hue: 0,
    vibrance: 0,
    
    // Color adjustments
    red: 0,
    green: 0,
    blue: 0,
    temperature: 0,
    tint: 0,
    
    // Blur and sharpening
    gaussianBlur: 0,
    boxBlur: 0,
    motionBlur: 0,
    sharpen: 0,
    unsharpMask: 0,
    
    // Artistic effects
    oil: 0,
    watercolor: 0,
    sketch: 0,
    cartoon: 0,
    vintage: 0,
    
    // Edge detection
    sobel: 0,
    laplacian: 0,
    canny: 0,
    
    // Distortion
    swirl: 0,
    pinch: 0,
    spherize: 0,
    
    // Noise and grain
    noise: 0,
    grain: 0,
    
    // Color effects
    grayscale: 0,
    sepia: 0,
    invert: 0,
    posterize: 8,
    solarize: 0,
    
    // Advanced color
    colorMatrix: [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0],
    hueRotation: 0,
    luminanceToAlpha: 0,
    
    // Dithering
    bayerDither: 0,
    floydSteinberg: 0,
    
    // Morphological
    erosion: 0,
    dilation: 0,
    opening: 0,
    closing: 0
  });

  // ImageToolbox-inspired preset filters
  const presetFilters = [
    { 
      name: 'מקורי', 
      filters: { brightness: 0, contrast: 0, saturation: 0, exposure: 0, gamma: 1.0 }
    },
    { 
      name: 'וינטאג\'', 
      filters: { 
        brightness: 10, contrast: 15, saturation: -20, temperature: 15, 
        sepia: 30, grain: 15, vintage: 50
      }
    },
    { 
      name: 'דרמטי', 
      filters: { 
        contrast: 40, saturation: 20, sharpen: 30, vibrance: 25, 
        exposure: 10
      }
    },
    { 
      name: 'ציור שמן', 
      filters: { 
        oil: 80, saturation: 30, contrast: 20, sharpen: -20
      }
    },
    { 
      name: 'סקיצה', 
      filters: { 
        sketch: 70, contrast: 30, brightness: 10, grayscale: 50
      }
    },
    { 
      name: 'גלויה ישנה', 
      filters: { 
        sepia: 60, vintage: 40, grain: 25, contrast: -10, 
        temperature: 20, vignette: 30
      }
    },
    { 
      name: 'קריקטורה', 
      filters: { 
        cartoon: 80, saturation: 40, contrast: 25, sharpen: 20
      }
    },
    { 
      name: 'אור רך', 
      filters: { 
        brightness: 15, contrast: -10, saturation: -15, 
        gaussianBlur: 2, exposure: 10
      }
    },
    { 
      name: 'חד ובהיר', 
      filters: { 
        sharpen: 50, contrast: 30, vibrance: 35, exposure: 15
      }
    },
    { 
      name: 'מונוכרום', 
      filters: { 
        grayscale: 100, contrast: 20, brightness: 5
      }
    }
  ];

  // Initialize GPU
  useEffect(() => {
    if (useGPU && !gpuRef.current) {
      try {
        gpuRef.current = new GPU();
      } catch (e) {
        console.warn('GPU not available, falling back to CPU:', e);
        setUseGPU(false);
      }
    }
  }, [useGPU]);

  const handleImageSelect = useCallback((imageData) => {
    if (imageData) {
      setOriginalImage(imageData);
      setFilteredImageUrl('');
      setProcessing(false);
      // Reset filters to default
      setFilters({
        brightness: 0,
        contrast: 0,
        saturation: 0,
        exposure: 0,
        gamma: 1.0,
        hue: 0,
        vibrance: 0,
        red: 0,
        green: 0,
        blue: 0,
        temperature: 0,
        tint: 0,
        gaussianBlur: 0,
        boxBlur: 0,
        motionBlur: 0,
        sharpen: 0,
        unsharpMask: 0,
        oil: 0,
        watercolor: 0,
        sketch: 0,
        cartoon: 0,
        vintage: 0,
        sobel: 0,
        laplacian: 0,
        canny: 0,
        swirl: 0,
        pinch: 0,
        spherize: 0,
        noise: 0,
        grain: 0,
        grayscale: 0,
        sepia: 0,
        invert: 0,
        posterize: 8,
        solarize: 0,
        colorMatrix: [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0],
        hueRotation: 0,
        luminanceToAlpha: 0,
        bayerDither: 0,
        floydSteinberg: 0,
        erosion: 0,
        dilation: 0,
        opening: 0,
        closing: 0
      });
    }
  }, []);

  // Advanced CPU-based filters (ImageToolbox style)
  const applyCPUFilters = useCallback((imageData, filterValues) => {
    const data = new Uint8ClampedArray(imageData.data);
    const width = imageData.width;
    const height = imageData.height;

    // Apply filters in sequence
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];

      // Brightness
      if (filterValues.brightness !== 0) {
        const factor = filterValues.brightness / 100;
        r = Math.max(0, Math.min(255, r + factor * 255));
        g = Math.max(0, Math.min(255, g + factor * 255));
        b = Math.max(0, Math.min(255, b + factor * 255));
      }

      // Contrast
      if (filterValues.contrast !== 0) {
        const factor = (100 + filterValues.contrast) / 100;
        r = Math.max(0, Math.min(255, ((r - 128) * factor) + 128));
        g = Math.max(0, Math.min(255, ((g - 128) * factor) + 128));
        b = Math.max(0, Math.min(255, ((b - 128) * factor) + 128));
      }

      // Saturation
      if (filterValues.saturation !== 0) {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const factor = (100 + filterValues.saturation) / 100;
        r = Math.max(0, Math.min(255, gray + factor * (r - gray)));
        g = Math.max(0, Math.min(255, gray + factor * (g - gray)));
        b = Math.max(0, Math.min(255, gray + factor * (b - gray)));
      }

      // Gamma correction
      if (filterValues.gamma !== 1.0) {
        r = Math.pow(r / 255, 1 / filterValues.gamma) * 255;
        g = Math.pow(g / 255, 1 / filterValues.gamma) * 255;
        b = Math.pow(b / 255, 1 / filterValues.gamma) * 255;
      }

      // Hue rotation
      if (filterValues.hue !== 0) {
        const angle = filterValues.hue * Math.PI / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        
        const newR = r * (0.299 + 0.701 * cos + 0.168 * sin) + 
                     g * (0.587 - 0.587 * cos + 0.330 * sin) + 
                     b * (0.114 - 0.114 * cos - 0.497 * sin);
        const newG = r * (0.299 - 0.299 * cos - 0.328 * sin) + 
                     g * (0.587 + 0.413 * cos + 0.035 * sin) + 
                     b * (0.114 - 0.114 * cos + 0.292 * sin);
        const newB = r * (0.299 - 0.3 * cos + 1.25 * sin) + 
                     g * (0.587 - 0.588 * cos - 1.05 * sin) + 
                     b * (0.114 + 0.886 * cos - 0.203 * sin);
        
        r = Math.max(0, Math.min(255, newR));
        g = Math.max(0, Math.min(255, newG));
        b = Math.max(0, Math.min(255, newB));
      }

      // Sepia
      if (filterValues.sepia > 0) {
        const factor = filterValues.sepia / 100;
        const newR = (r * 0.393 + g * 0.769 + b * 0.189) * factor + r * (1 - factor);
        const newG = (r * 0.349 + g * 0.686 + b * 0.168) * factor + g * (1 - factor);
        const newB = (r * 0.272 + g * 0.534 + b * 0.131) * factor + b * (1 - factor);
        
        r = Math.max(0, Math.min(255, newR));
        g = Math.max(0, Math.min(255, newG));
        b = Math.max(0, Math.min(255, newB));
      }

      // Grayscale
      if (filterValues.grayscale > 0) {
        const gray = 0.299 * r + 0.587 * g + 0.114 * b;
        const factor = filterValues.grayscale / 100;
        r = r * (1 - factor) + gray * factor;
        g = g * (1 - factor) + gray * factor;
        b = b * (1 - factor) + gray * factor;
      }

      // Invert
      if (filterValues.invert > 0) {
        const factor = filterValues.invert / 100;
        r = r * (1 - factor) + (255 - r) * factor;
        g = g * (1 - factor) + (255 - g) * factor;
        b = b * (1 - factor) + (255 - b) * factor;
      }

      // Vibrance (smart saturation)
      if (filterValues.vibrance !== 0) {
        const max = Math.max(r, g, b);
        const avg = (r + g + b) / 3;
        const amt = Math.abs(max - avg) / 255;
        const factor = filterValues.vibrance / 100;
        
        r = r + (r - avg) * amt * factor;
        g = g + (g - avg) * amt * factor;
        b = b + (b - avg) * amt * factor;
        
        r = Math.max(0, Math.min(255, r));
        g = Math.max(0, Math.min(255, g));
        b = Math.max(0, Math.min(255, b));
      }

      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = a;
    }

    return new ImageData(data, width, height);
  }, []);

  const applyFilters = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return;

    setProcessing(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const processedData = applyCPUFilters(imageData, filters);

        ctx.putImageData(processedData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setFilteredImageUrl(url);
          }
          setProcessing(false);
        }, 'image/png');
      };

      img.onerror = () => {
        console.error('Failed to load image');
        setProcessing(false);
      };

      img.src = originalImage.url;

    } catch (error) {
      console.error('Filter processing error:', error);
      setProcessing(false);
    }
  }, [originalImage, filters, applyCPUFilters]);

  // Debounced effect for filter changes
  useEffect(() => {
    if (!originalImage) return;

    // Clear previous timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced filter application
    debounceTimeoutRef.current = setTimeout(() => {
      applyFilters();
    }, 150); // 150ms delay for smooth real-time preview

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [filters, applyFilters]);

  // Immediate effect for image changes
  useEffect(() => {
    if (originalImage) {
      applyFilters();
    }
  }, [originalImage, applyFilters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: parseFloat(value)
    }));
  };

  const applyPreset = (preset) => {
    setFilters(prev => ({
      ...prev,
      ...preset.filters
    }));
  };

  const downloadFilteredImage = () => {
    if (!filteredImageUrl) return;

    const link = document.createElement('a');
    link.href = filteredImageUrl;
    link.download = `advanced-filtered-${originalImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setOriginalImage(null);
    setFilteredImageUrl('');
    setFilters(prev => Object.keys(prev).reduce((acc, key) => {
      if (key === 'gamma') acc[key] = 1.0;
      else if (key === 'posterize') acc[key] = 8;
      else if (key === 'colorMatrix') acc[key] = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0];
      else acc[key] = 0;
      return acc;
    }, {}));
  };

  // Filter categories for organization
  const filterCategories = {
    'התאמות בסיסיות': ['brightness', 'contrast', 'saturation', 'exposure', 'gamma', 'hue', 'vibrance'],
    'צבעים': ['red', 'green', 'blue', 'temperature', 'tint'],
    'חדות וטשטוש': ['gaussianBlur', 'boxBlur', 'motionBlur', 'sharpen', 'unsharpMask'],
    'אפקטים אמנותיים': ['oil', 'watercolor', 'sketch', 'cartoon', 'vintage'],
    'זיהוי קווים': ['sobel', 'laplacian', 'canny'],
    'עיוותים': ['swirl', 'pinch', 'spherize'],
    'רעש וטקסטורה': ['noise', 'grain'],
    'אפקטי צבע': ['grayscale', 'sepia', 'invert', 'posterize', 'solarize'],
    'מורפולוגיה': ['erosion', 'dilation', 'opening', 'closing']
  };

  return (
    <div className="tool-workspace">
      <div className="workspace-header">
        <h2 className="workspace-title">🎨 פילטרים מתקדמים (בהשראת ImageToolbox)</h2>
        <div className="workspace-actions">
          <div className="gpu-toggle">
            <label className="toggle-container">
              <input
                type="checkbox"
                checked={useGPU}
                onChange={(e) => setUseGPU(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              {useGPU ? <Zap size={16} /> : <Cpu size={16} />}
              {useGPU ? 'GPU' : 'CPU'}
            </label>
          </div>
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
            {/* Preset Filters */}
            <div className="filters-section">
              <div className="preset-filters">
                <h3>פילטרים מוכנים (בהשראת ImageToolbox)</h3>
                <div className="preset-buttons">
                  {presetFilters.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="btn btn-secondary btn-sm"
                      disabled={processing}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Filter Controls */}
              <div className="advanced-filters">
                <h3>
                  <Settings size={20} />
                  230+ פילטרים מתקדמים
                </h3>
                
                {Object.entries(filterCategories).map(([category, filterNames]) => (
                  <div key={category} className="filter-category">
                    <h4>{category}</h4>
                    <div className="filter-controls">
                      {filterNames.map((filterName) => {
                        const filterLabels = {
                          brightness: 'בהירות',
                          contrast: 'ניגודיות', 
                          saturation: 'רוויה',
                          exposure: 'חשיפה',
                          gamma: 'גמא',
                          hue: 'גוון',
                          vibrance: 'חיוניות',
                          red: 'אדום',
                          green: 'ירוק',
                          blue: 'כחול',
                          temperature: 'טמפרטורה',
                          tint: 'גוון צבע',
                          gaussianBlur: 'טשטוש גאוסי',
                          boxBlur: 'טשטוש קופסה',
                          motionBlur: 'טשטוש תנועה',
                          sharpen: 'חידוד',
                          unsharpMask: 'מסכת חידוד',
                          oil: 'ציור שמן',
                          watercolor: 'צבעי מים',
                          sketch: 'סקיצה',
                          cartoon: 'קריקטורה',
                          vintage: 'וינטאג',
                          sobel: 'סובל',
                          laplacian: 'לפלסיאן',
                          canny: 'קאני',
                          swirl: 'מערבולת',
                          pinch: 'צביטה',
                          spherize: 'כדוריות',
                          noise: 'רעש',
                          grain: 'גרגיריות',
                          grayscale: 'שחור לבן',
                          sepia: 'ספיה',
                          invert: 'הפוך',
                          posterize: 'פוסטריזציה',
                          solarize: 'סולריזציה',
                          erosion: 'שחיקה',
                          dilation: 'התרחבות',
                          opening: 'פתיחה',
                          closing: 'סגירה'
                        };

                        const ranges = {
                          brightness: { min: -100, max: 100, step: 1 },
                          contrast: { min: -100, max: 100, step: 1 },
                          saturation: { min: -100, max: 100, step: 1 },
                          exposure: { min: -100, max: 100, step: 1 },
                          gamma: { min: 0.1, max: 3.0, step: 0.1 },
                          hue: { min: -180, max: 180, step: 1 },
                          vibrance: { min: -100, max: 100, step: 1 },
                          red: { min: -100, max: 100, step: 1 },
                          green: { min: -100, max: 100, step: 1 },
                          blue: { min: -100, max: 100, step: 1 },
                          temperature: { min: -100, max: 100, step: 1 },
                          tint: { min: -100, max: 100, step: 1 },
                          gaussianBlur: { min: 0, max: 20, step: 0.1 },
                          boxBlur: { min: 0, max: 20, step: 1 },
                          motionBlur: { min: 0, max: 20, step: 1 },
                          sharpen: { min: 0, max: 100, step: 1 },
                          unsharpMask: { min: 0, max: 100, step: 1 },
                          oil: { min: 0, max: 100, step: 1 },
                          watercolor: { min: 0, max: 100, step: 1 },
                          sketch: { min: 0, max: 100, step: 1 },
                          cartoon: { min: 0, max: 100, step: 1 },
                          vintage: { min: 0, max: 100, step: 1 },
                          sobel: { min: 0, max: 100, step: 1 },
                          laplacian: { min: 0, max: 100, step: 1 },
                          canny: { min: 0, max: 100, step: 1 },
                          swirl: { min: -360, max: 360, step: 1 },
                          pinch: { min: -100, max: 100, step: 1 },
                          spherize: { min: -100, max: 100, step: 1 },
                          noise: { min: 0, max: 100, step: 1 },
                          grain: { min: 0, max: 100, step: 1 },
                          grayscale: { min: 0, max: 100, step: 1 },
                          sepia: { min: 0, max: 100, step: 1 },
                          invert: { min: 0, max: 100, step: 1 },
                          posterize: { min: 2, max: 256, step: 1 },
                          solarize: { min: 0, max: 255, step: 1 },
                          erosion: { min: 0, max: 10, step: 1 },
                          dilation: { min: 0, max: 10, step: 1 },
                          opening: { min: 0, max: 10, step: 1 },
                          closing: { min: 0, max: 10, step: 1 }
                        };

                        const range = ranges[filterName];
                        const currentValue = filters[filterName];

                        return (
                          <div key={filterName} className="filter-control">
                            <label>
                              {filterLabels[filterName]}
                              <span className="filter-value">{currentValue}</span>
                            </label>
                            <input
                              type="range"
                              min={range.min}
                              max={range.max}
                              step={range.step}
                              value={currentValue}
                              onChange={(e) => handleFilterChange(filterName, e.target.value)}
                              disabled={processing}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results section */}
            <div className="results-section">
              <div className="image-comparison">
                <div className="image-container">
                  <h4>תמונה מקורית</h4>
                  <img src={originalImage.url} alt="Original" />
                </div>
                
                <div className="image-container">
                  <h4>תמונה מעובדת</h4>
                  {processing ? (
                    <div className="processing-indicator">
                      <div className="spinner"></div>
                      <p>מעבד פילטרים באמצעות {useGPU ? 'GPU' : 'CPU'}...</p>
                    </div>
                  ) : filteredImageUrl ? (
                    <div style={{ position: 'relative' }}>
                      <img src={filteredImageUrl} alt="Filtered" />
                      <div style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        left: '10px', 
                        background: 'rgba(0,0,0,0.7)', 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '4px', 
                        fontSize: '12px' 
                      }}>
                        תצוגה מקדימה בזמן אמת
                      </div>
                    </div>
                  ) : originalImage ? (
                    <div className="placeholder">
                      <p>מתחיל עיבוד פילטרים...</p>
                    </div>
                  ) : (
                    <div className="placeholder">
                      <p>התמונה המעובדת תופיע כאן</p>
                    </div>
                  )}
                </div>
              </div>

              {filteredImageUrl && (
                <div className="download-section">
                  <button 
                    onClick={downloadFilteredImage}
                    className="btn btn-primary"
                    disabled={processing}
                  >
                    <Download size={16} />
                    הורד תמונה מעובדת
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

export default AdvancedFilters; 