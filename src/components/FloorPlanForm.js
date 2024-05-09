import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FloorPlanContext } from './FloorPlanContext';
import '../styles/FloorPlanForm.css';

const NumberInput = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`;

function FloorPlanForm({ onSubmit }) {
  const { saveFloorPlan, currentImage, createFinalImage} = useContext(FloorPlanContext);
  const [formData, setFormData] = useState({
    name: '',
    interiorSize: '',
    interiorUnit: 'ft',
    exteriorSize: '',
    exteriorUnit: 'ft',
    exteriorType: '',
    facingDirection: '',
    floorType: ''
  });
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFinalImage((generatedImage) => {
      saveFloorPlan(formData, generatedImage);
      onSubmit?.();

      setFormData({
        name: '',
        interiorSize: '',
        interiorUnit: 'ft',
        exteriorSize: '',
        exteriorUnit: 'ft',
        exteriorType: '',
        facingDirection: '',
        floorType: ''
      });

      setPopup(true);
  
      setTimeout(() => {
        setPopup(false);
      }, 2500);
    });
  };

  const allFieldsFilled = () => {
    return formData.name && formData.interiorSize && formData.exteriorSize && 
           formData.exteriorType && formData.facingDirection && formData.floorType && 
           parseInt(formData.interiorSize) > 0 && parseInt(formData.exteriorSize) > 0 && currentImage;
  };

  return (
    <form onSubmit={handleSubmit}>
      {popup && <div className="popup">Form submitted successfully!</div>}
      <label>Name: </label>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} />
      <br />
      

      <label>Interior Size: </label>
      <div className="input-row"> {}
        <NumberInput type="number" name="interiorSize" placeholder="Interior Size" onChange={handleChange} value={formData.interiorSize} min="0"/>
        <select name="interiorUnit" onChange={handleChange} value={formData.interiorUnit}>
          <option value="ft">ft</option>
          <option value="m">m</option>
        </select>
      </div>
      <br />

      <label>Exterior Size: </label>
      <div className="input-row"> {}
        <NumberInput type="number" name="exteriorSize" placeholder="Exterior Size" onChange={handleChange} value={formData.exteriorSize} min="0"/>
        <select name="exteriorUnit" onChange={handleChange} value={formData.exteriorUnit}>
          <option value="ft">ft</option>
          <option value="m">m</option>
        </select>
      </div>
      <br />
      
      <label>Exterior Type: </label>
      <select name="exteriorType" onChange={handleChange} value={formData.exteriorType}>
        <option value="">Select Exterior Type</option>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
        <option value="D">Option D</option>
      </select>
      <br />
      
      <label>Facing Direction: </label>
      <select name="facingDirection" onChange={handleChange} value={formData.facingDirection}>
        <option value="">Select Facing Direction</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="East">East</option>
        <option value="West">West</option>
      </select>
      <br />
      
      <label>Floor Type: </label>
      <select name="floorType" onChange={handleChange} value={formData.floorType}>
        <option value="">Select Floor Type</option>
        <option value="Studio">Studio</option>
        <option value="One Bed One Bath">One Bed One Bath</option>
        <option value="Two Bed One Bath">Two Bed One Bath</option>
        <option value="Three Bed 2 Bath">Three Bed 2 Bath</option>
      </select>
      <br />
      
      <button type="submit" disabled={!allFieldsFilled()}>Submit</button>
    </form>
  );
}

export default FloorPlanForm;