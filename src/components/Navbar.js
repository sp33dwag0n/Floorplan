import React from 'react'
import { Link } from "react-router-dom"
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className="navbar">
        <Link to="/"> Form </Link>
        <Link to="/floorplans"> List </Link>
    </div>
  )
}

export default Navbar;