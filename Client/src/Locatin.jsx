import React, { useState, useEffect } from 'react';
import './CSS/Locatin.css';
import GoogleMapsLocation from './Map'; // Import the GoogleMapsLocation component
import { Link } from 'react-router-dom';
import mapview0 from './Map/mapview0';
import mapview2 from './Map/mapview2';


function mapD({ showNotification }) {
  return (
    <>
     <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/VehicleDetails'}>
        Back
      </button>
      
      <div className="main-container">
        <div className="button-panel">
          {/* Add your buttons here */}
          <Link to="/Mapview0">
          <button type="button">Bus</button>
          </Link>
          <Link to="/Mapview1">
          <button type="button">Van</button>
          </Link>
          <Link to="/Mapview2">
          <button type="button">MiniBus</button>
          </Link>
          <Link to="/Mapview3">
          <button type="button">Tractor</button>
          </Link>
          <Link to="/Mapview4">
          <button type="button">Car</button>
          </Link>
          <Link to="/Mapview5">
          <button type="button">Truck</button>
          </Link>
        </div>
        
        <div className='map-panel'>
          <GoogleMapsLocation />
        </div>
      </div>
    </>
  );
}

export default mapD;