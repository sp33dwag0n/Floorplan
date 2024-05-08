import React, { createContext, useState } from 'react';

export const FloorPlanContext = createContext();

export const FloorPlanProvider = ({ children }) => {
  const [floorPlans, setFloorPlans] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);

  const saveFloorPlan = (floorPlan, image) => {
    setFloorPlans([...floorPlans, { ...floorPlan, image }]);
    setCurrentImage(null);
    setRotation(0);
    setZoom(100);
  };

  return (
    <FloorPlanContext.Provider value={{
      floorPlans, saveFloorPlan, currentImage, setCurrentImage, rotation, setRotation, 
      zoom, setZoom
    }}>
      {children}
    </FloorPlanContext.Provider>
  );
};