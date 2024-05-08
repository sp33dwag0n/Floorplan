import React, { useCallback, useContext, useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FloorPlanContext } from './FloorPlanContext';
import '../styles/ImageUploadBox.css';

function ImageUploadBox() {
  const { currentImage, setCurrentImage, rotation, setRotation, zoom, setZoom } = useContext(FloorPlanContext);
  const [position, setPosition] = useState({x:0, y:0});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentImage(e.target.result);
      setRotation(0);
      setZoom(100);
      setPosition({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, [setCurrentImage, setRotation, setZoom]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true, noKeyboard: true });

  const handleMouseDown = (e) => {
    if (currentImage) {
      setIsDragging(true);
      e.target.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = (e) => {
    if (currentImage) {
      setIsDragging(false);
      e.target.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (event) => {
    if (isDragging && currentImage) {
      const { movementX, movementY } = event;
      setPosition(prev => ({
        x: prev.x + movementX,
        y: prev.y + movementY
      }));
    }
  };

  const onButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="image-upload-container">
      <div {...getRootProps()} className="image-box">
        <div className="image-container" style={{
            backgroundImage: `url(${currentImage})`, 
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${zoom / 100})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        >
          <input {...getInputProps()} ref={fileInputRef} />
          {!currentImage && <p>Upload an Image Here!</p>}
        </div>
      </div>
      <div>
      <button onClick={onButtonClick} className="upload-button">Upload Image</button>
        {currentImage && (
          <div>
            <button onClick={() => setRotation(rotation - 90)} className="rotate-button">Rotate Left</button>
            <button onClick={() => setRotation(rotation + 90)} className="rotate-button">Rotate Right</button>
            <input type="range" min="50" max="300" step="10" value={zoom} onChange={(e) => setZoom(e.target.value)} className="slider" />
          </div>
        )}
      </div>
      
    </div>
  );
}

export default ImageUploadBox;
