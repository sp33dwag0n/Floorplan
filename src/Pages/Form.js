import React from 'react';
import FloorPlanForm from '../components/FloorPlanForm';
import ImageUploadBox from '../components/ImageUploadBox';
import '../styles/Form.css';

function Form() {
  return (
    <div className="form">
            <h1> Submit a Floor Plan: </h1>
            <ImageUploadBox />
            <FloorPlanForm />
    </div>
  )
}

export default Form;