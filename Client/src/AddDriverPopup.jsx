import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/DriverAdd.css';

function Home() {
  const [regnumber, setregnumber] = useState('');
  const [drivername, setdrivername] = useState('');
  const [Telephone, setTelephone] = useState('');
 
  const navigate = useNavigate();

  // Function to reset form fields
  const resetForm = () => {
    setregnumber('');
    setdrivername('');
    setTelephone('');
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kdu-tms.onrender.com/DriverDetails', {
      regnumber,
      drivername,
      Telephone,
      
    })
    .then(result => {
      console.log(result);
      alert('Request submitted successfully!');
      resetForm(); // Reset the form fields
    })
    .catch(err => {
      console.log(err);
      alert('An error occurred. Please try again.');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="Dform-bg">
      <button type="button" className="Dclosebtn" onClick={() => { navigate('/DriversDetails'); window.location.reload(); }}> X </button>

      {/* First Column */}
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="name">Register Number</label>
          <input type="text" placeholder="Enter Register Number" autoComplete="off" name="applicantname" className="input-box" onChange={(e) => setregnumber(e.target.value)} required value={regnumber} />
        </div>

        <div className="col">
          <label htmlFor="appiicantAppoinment">Driver Name</label>
          <input type="text" placeholder="Enter Driver's Name" autoComplete="off" name="appiicantAppoinment" className="input-box" onChange={(e) => setdrivername(e.target.value)} required value={drivername} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label htmlFor="vehicleIncharge">Telephone Number</label>
          <input type="text" placeholder="Enter Driver Telephone" autoComplete="off" name="vehicleIncharge" className="input-box" onChange={(e) => setTelephone(e.target.value)} required value={Telephone} />
        </div>
      </div>

      
      <button type="submit" className="DAddbtn"> Add </button>
    </form>
  );
}

export default Home;