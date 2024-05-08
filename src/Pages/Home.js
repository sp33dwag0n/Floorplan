import React from 'react';
import ViewFloorPlans from '../components/ViewFloorPlans';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
        <h1> Floor Plans: </h1>
        <ViewFloorPlans />
    </div>
  )
}

export default Home