import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/VehicleAdd.css';

function Home() {
  const [vehiclenumber, setvehiclenumber] = useState('');
  const [maintainsDate, setmaintainsDate] = useState('');
  const [price, setprice] = useState('');
  const [Description, setDescription] = useState('');

  const navigate = useNavigate();

  // Function to reset form fields
  const resetForm = () => {
    setvehiclenumber('');
    setmaintainsDate('');
    setprice('');
    setDescription('');

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kdu-tms.onrender.com/MaintainDetails', {
      vehiclenumber,
      maintainsDate,
      price,
      Description,
      
    })
    .then(result => {
      console.log(result);
      alert('Request submitted successfully!');
      // Reset the form fields
      resetForm();
    })
    .catch(err => {
      console.log(err);
      alert('An error occurred. Please try again.');
    });
  };

  return (

      <form onSubmit={handleSubmit} className="form-bg">
      <button type="button" className="closebtn" onClick={() => { navigate('/Maintains'); window.location.reload(); }}> X </button>

        <div className="row1">
          <label htmlFor="name">Vehicle Number</label>
          <input type="text" placeholder="Enter Vehicle Number" autoComplete="off" name="applicantname" className="input-box" value={vehiclenumber} onChange={(e) => setvehiclenumber(e.target.value)} required />
        </div>

        <div className="row2">
          <label htmlFor="appiicantAppoinment">Maintains Date</label>
          <input type="Date" placeholder="Enter Owner's Name" autoComplete="off" name="appiicantAppoinment" className="input-box" value={maintainsDate} onChange={(e) => setmaintainsDate(e.target.value)} required />
          <label htmlFor="vehicleIncharge">Price</label>
          <input type="text" placeholder="Enter Price" autoComplete="off" name="Vehicle Model" className="input-box" value={price} onChange={(e) => setprice(e.target.value)} required />
        </div>

        <div className="row3">
          <label htmlFor="dateofRequired">Description </label>
          <input type="text" placeholder="Enter Description" autoComplete="off" name="dateofRequired" className="input-box" value={Description} onChange={(e) => setDescription(e.target.value)} required />
          
          <button type="submit" className="Addbtn"> Add </button>
              
        </div>
        

      </form>
  );
}

export default Home;