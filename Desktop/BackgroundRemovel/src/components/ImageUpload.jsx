import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, FileImage } from 'lucide-react';

const ImageUpload = ({ 
  onImageSelect, 
  acceptedFormats = ['image/*'], 
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = ''
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setDragOver(false);
    
    if (rejectedFiles.length > 0) {
      alert('חלק מהקבצים נדחו. אנא בדוק שהקבצים הם תמונות ולא גדולים מ-10MB');
      return;
    }

    const newImages = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    if (multiple) {
      setUploadedImages(prev => [...prev, ...newImages]);
      onImageSelect([...uploadedImages, ...newImages]);
    } else {
      setUploadedImages(newImages);
      onImageSelect(newImages[0]);
    }
  }, [onImageSelect, multiple, uploadedImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFormats.reduce((acc, format) => {
      acc[format] = [];
      return acc;
    }, {}),
    maxSize,
    multiple,
    onDragEnter: () => setDragOver(true),
    onDragLeave: () => setDragOver(false)
  });

  const removeImage = (imageId) => {
    const updatedImages = uploadedImages.filter(img => img.id !== imageId);
    setUploadedImages(updatedImages);
    
    if (multiple) {
      onImageSelect(updatedImages);
    } else {
      onImageSelect(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`upload-container ${className}`}>
      <div
        {...getRootProps()}
        className={`upload-area ${isDragActive || dragOver ? 'drag-over' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="upload-content">
          <div className="upload-icon">
            <Upload size={48} />
          </div>
          <div className="upload-text">
            {isDragActive ? 'שחרר כאן כדי להעלות' : 'גרור תמונות לכאן או לחץ לבחירה'}
          </div>
          <div className="upload-subtext">
            תומך ב-JPG, PNG, WebP, HEIC, GIF עד {formatFileSize(maxSize)}
          </div>
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div className="uploaded-images">
          <h3 className="uploaded-title">תמונות שהועלו</h3>
          <div className="images-grid">
            {uploadedImages.map(image => (
              <div key={image.id} className="uploaded-image-card">
                <div className="image-preview-wrapper">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="uploaded-image-preview"
                  />
                  <button 
                    className="remove-image-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="image-info">
                  <div className="image-name" title={image.name}>
                    {image.name.length > 20 ? 
                      image.name.substring(0, 20) + '...' : 
                      image.name
                    }
                  </div>
                  <div className="image-size">{formatFileSize(image.size)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload; 