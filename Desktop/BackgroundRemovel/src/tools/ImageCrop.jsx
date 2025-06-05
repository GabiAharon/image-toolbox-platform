import React, { useState, useRef, useCallback } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { Download, RotateCcw, Square, Maximize } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [croppedImageUrl, setCroppedImageUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState(null);
  const imgRef = useRef();
  const previewCanvasRef = useRef();

  const aspectRatios = [
    { label: 'חופשי', value: null },
    { label: '1:1 (מרבע)', value: 1 },
    { label: '4:3', value: 4/3 },
    { label: '16:9', value: 16/9 },
    { label: '3:2', value: 3/2 },
    { label: '2:3 (דיוקן)', value: 2/3 },
    { label: '9:16 (סטורי)', value: 9/16 }
  ];

  const handleImageSelect = useCallback((imageData) => {
    if (imageData) {
      setOriginalImage(imageData);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setCroppedImageUrl('');
    }
  }, []);

  const onImageLoad = (e) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 50,
          },
          aspectRatio,
          width,
          height,
        ),
        width,
        height,
      ));
    }
  };

  const handleAspectRatioChange = (newAspectRatio) => {
    setAspectRatio(newAspectRatio);
    
    if (imgRef.current && newAspectRatio) {
      const { width, height } = imgRef.current;
      setCrop(centerCrop(
        makeAspectCrop(
          {
            unit: '%',
            width: 50,
          },
          newAspectRatio,
          width,
          height,
        ),
        width,
        height,
      ));
    }
  };

  const generateCroppedImage = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(completedCrop.width * scaleX);
    canvas.height = Math.floor(completedCrop.height * scaleY);

    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCroppedImageUrl(url);
          resolve(url);
        }
      }, 'image/png');
    });
  }, [completedCrop]);

  const downloadCroppedImage = () => {
    if (!croppedImageUrl) return;

    const link = document.createElement('a');
    link.href = croppedImageUrl;
    link.download = `cropped-${originalImage.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setOriginalImage(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setCroppedImageUrl('');
    setAspectRatio(null);
  };

  return (
    <div className="tool-workspace">
      <div className="workspace-header">
        <h2 className="workspace-title">✂️ חיתוך תמונה</h2>
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
            <div className="crop-controls">
              <h3>יחס גובה-רוחב</h3>
              <div className="aspect-ratio-buttons">
                {aspectRatios.map((ratio) => (
                  <button
                    key={ratio.label}
                    onClick={() => handleAspectRatioChange(ratio.value)}
                    className={`btn ${aspectRatio === ratio.value ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="crop-workspace">
              <div className="crop-container">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  minWidth={50}
                  minHeight={50}
                >
                  <img
                    ref={imgRef}
                    src={originalImage.url}
                    alt="לחיתוך"
                    onLoad={onImageLoad}
                    className="crop-image"
                  />
                </ReactCrop>
              </div>

              {completedCrop && (
                <div className="crop-actions">
                  <button
                    onClick={generateCroppedImage}
                    className="btn btn-primary"
                  >
                    <Square size={16} />
                    חתוך תמונה
                  </button>
                </div>
              )}
            </div>

            {croppedImageUrl && (
              <div className="crop-result">
                <h3>תוצאת החיתוך</h3>
                <div className="cropped-image-container">
                  <img
                    src={croppedImageUrl}
                    alt="תמונה חתוכה"
                    className="cropped-image-preview"
                  />
                  <button
                    onClick={downloadCroppedImage}
                    className="btn btn-success"
                  >
                    <Download size={16} />
                    הורד תמונה חתוכה
                  </button>
                </div>
              </div>
            )}

            <canvas
              ref={previewCanvasRef}
              style={{ display: 'none' }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCrop; 