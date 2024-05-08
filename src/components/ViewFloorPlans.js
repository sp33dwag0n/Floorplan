import React, { useContext } from 'react';
import { FloorPlanContext } from './FloorPlanContext';
import '../styles/ViewFloorPlans.css';

function ViewFloorPlans() {
  const { floorPlans } = useContext(FloorPlanContext);

  return (
    <div className="view-floor-plans-container">
      {floorPlans.map((plan, index) => (
        <div key={index} className="floor-plan-card">
          <h3>{plan.name}</h3>
          {plan.image && <img src={plan.image} alt="Floor Plan" />}
          <p>Interior Size: {plan.interiorSize} {plan.interiorUnit}</p>
          <p>Exterior Size: {plan.exteriorSize} {plan.exteriorUnit}</p>
          <p>Exterior Type: {plan.exteriorType}</p>
          <p>Facing Direction: {plan.facingDirection}</p>
          <p>Floor Type: {plan.floorType}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewFloorPlans;
