import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/DriverHome.css';
import { Link } from 'react-router-dom';
import LiveMap from './Map';
import Map1 from './Map/Map1';

function HomeA() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="nav-buttons">
            <Link to="/Map0" className="reservationbtn">Bus</Link>
            <Link to="/Map1" className="reservationbtn">Van</Link>
            <Link to="/Map2" className="reservationbtn">MiniBus</Link>
            <Link to="/Map3" className="reservationbtn">Tractor</Link>
            <Link to="/map4" className="reservationbtn">Car</Link>
            <Link to="/map5" className="reservationbtn">Truck</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeA;