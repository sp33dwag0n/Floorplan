import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { FloorPlanContext } from './FloorPlanContext';
import '../styles/ImageUploadBox.css';

function ImageUploadBox() {
  const { currentImage, setCurrentImage, rotation, setRotation, zoom, setZoom } = useContext(FloorPlanContext);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentImage(e.target.result);
      setRotation(0);
      setZoom(100);
    };
    reader.readAsDataURL(file);
  }, [setCurrentImage, setRotation, setZoom]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="image-upload-container">
      <div {...getRootProps()} className="image-box">
        <div className="image-container" style={{
            backgroundImage: `url(${currentImage})`, 
            transform: `rotate(${rotation}deg) scale(${zoom / 100})`
        }}>
          <input {...getInputProps()} />
          {!currentImage && <p>Drag 'n' drop some files here, or click to select files</p>}
        </div>
      </div>
      {currentImage && (
        <div>
          <button onClick={() => setRotation(rotation - 90)} className="rotate-button">Rotate Left</button>
          <button onClick={() => setRotation(rotation + 90)} className="rotate-button">Rotate Right</button>
          <input type="range" min="50" max="300" step="10" value={zoom} onChange={(e) => setZoom(e.target.value)} className="slider" />
        </div>
      )}
    </div>
  );
}

export default ImageUploadBox;
