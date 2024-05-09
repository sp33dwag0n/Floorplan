import React, { createContext, useState, useRef } from 'react';

export const FloorPlanContext = createContext();

export const FloorPlanProvider = ({ children }) => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [position, setPosition] = useState({x:0, y:0});
  const canvasRef = useRef(null);

  const saveFloorPlan = (floorPlan, image) => {
    setFloorPlans([...floorPlans, { ...floorPlan, image }]);
    setCurrentImage(null);
    setRotation(0);
    setZoom(100);
    setPosition({ x: 0, y: 0 });
  };

  const createFinalImage = (callback) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = currentImage;
    img.onload = () => {
      canvas.width = 600;
      canvas.height = 400;

      const scaleX = (canvas.width / img.width) * (zoom / 100);
      const scaleY = (canvas.height / img.height) * (zoom / 100);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2 * scaleX + position.x, -img.height / 2 * scaleY + position.y, img.width * scaleX, img.height * scaleY);
      const finalImageDataUrl = canvas.toDataURL('image/png');
      ctx.restore();

      callback(finalImageDataUrl);
    };
  };

  return (
    <FloorPlanContext.Provider value={{
      floorPlans, saveFloorPlan, currentImage, setCurrentImage, rotation, setRotation, 
      zoom, setZoom, position, setPosition, createFinalImage, canvasRef
    }}>
      {children}
    </FloorPlanContext.Provider>
  );
};