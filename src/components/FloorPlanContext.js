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

      let scale = 0;
      if ((img.width / img.height) > (canvas.width / canvas.height)) {
        scale = (canvas.width / img.width) * (zoom / 100);
      } else {
        scale = (canvas.height / img.height) * (zoom / 100);
      }
      

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      let dy = 0;
      let dx = 0;
      let dWidth = img.width * scale;
      let dHeight = img.height * scale;

      if (rotation % 360 === 0) {
        dx = -img.width / 2 * scale + position.x;
        dy = -img.height / 2 * scale + position.y; 
      } else if ((rotation + 180) % 360 === 0) {
        dx = -img.width / 2 * scale - position.x;
        dy = -img.height / 2 * scale - position.y;
      } else if ((rotation + 90) % 360 === 0) {
        dx = -img.width / 2 * scale - position.y;
        dy = -img.height / 2 * scale + position.x;
      } else {
        dx = -img.width / 2 * scale + position.y;
        dy = -img.height / 2 * scale - position.x;
      }

      ctx.drawImage(img, dx, dy, dWidth, dHeight);


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