import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function Home() {
  const [applicantname, setapplicantname] = useState('');
  const [appiicantAppoinment, setappiicantAppoinment] = useState('');
  const [vehicleIncharge, setvehicleIncharge] = useState('');
  const [dateofRequired, setdateofRequired] = useState('');
  const [timeofRequired, settimeofRequired] = useState('');
  const [natureofDuty, setnatureofDuty] = useState('');
  const [addresstoGo, setaddresstoGo] = useState('');
  const [requirement, setrequirement] = useState('');
  const [timetobeSpent, settimetobeSpent] = useState('');
  const [distance, setdistance] = useState('');
  const [dateofArrival, setdateofArrival] = useState('');
  const [timeofArrival, settimeofArrival] = useState('');
  const [numofOfficers, setnumofOfficers] = useState(0); // Initialize with 0
  const [numofLectures, setnumofLectures] = useState(0); // Initialize with 0
  const [numofInstructors, setnumofInstructors] = useState(0); // Initialize with 0
  const [numofcadetOfficers, setnumofcadetOfficers] = useState(0); // Initialize with 0
  const [numofdayScholers, setnumofdayScholers] = useState(0); // Initialize with 0
  const [numofcivilStaff, setnumofcivilStaff] = useState(0); // Initialize with 0
  const [totalofPassengers, settotalofPassengers] = useState(0); // Initialize with 0

  const [routetoFollow, setroutetoFollow] = useState('');
  
  // Initialize dateOfApply with the current date in YYYY-MM-DD format
  const currentDate = new Date();
  const [dateofApply, setdateofApply] = useState(
    currentDate.toISOString().split('T')[0]
  );

  const navigate = useNavigate();

  // Function to calculate the total of passengers
  const calculateTotalPassengers = () => {
    const total =
      parseInt(numofOfficers) +
      parseInt(numofLectures) +
      parseInt(numofInstructors) +
      parseInt(numofcadetOfficers) +
      parseInt(numofdayScholers) +
      parseInt(numofcivilStaff);
    settotalofPassengers(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://kdu-tms.onrender.com/home2', {
        applicantname,
        appiicantAppoinment,
        vehicleIncharge,
        dateofRequired,
        timeofRequired,
        natureofDuty,
        addresstoGo,
        requirement,
        timetobeSpent,
        distance,
        dateofArrival,
        timeofArrival,
        numofOfficers,
        numofLectures,
        numofInstructors,
        numofcadetOfficers,
        numofdayScholers,
        numofcivilStaff,
        totalofPassengers,
        dateofApply,
      })
      .then((result) => {
        console.log(result);
        alert('Request submitted successfully!');
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
        alert('An error occurred. Please try again.');
      });
  };              

  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <h1 className="user">FOT</h1>
      <img src="profile-user.png" className="userimg" alt="User" />
      <button
        type="button"
        className="logoutbtn"
        onClick={() => window.location.href = '/'}
      >
        Logout
      </button>

      <div className="Buttons">
        <Link to="/conformation2" className="Requestbtn">
          {' '}
          View{' '}
        </Link>
        <Link to="/cancel2" className="Editbtn">
          {' '}
          Edit{' '}
        </Link>
      </div>

      <div className="notification-panelS">
      <form onSubmit={handleSubmit} className="form-container">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="name"><strong>Applicant Name</strong></label>
              <input type="text" placeholder="Enter Name" autoComplete="off" name="applicantname" className="input-box" onChange={(e) => setapplicantname(e.target.value)} required />
            </div>
            
            <div className="col">
              <label htmlFor="vehicleIncharge"> <strong>Vehicle Incharge</strong> </label>
              <input type="text" placeholder="Enter Vehicle Incharge" autoComplete="off" name="vehicleIncharge" className="input-box" onChange={(e) => setvehicleIncharge(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="dateofRequired"> <strong>Date Of Required</strong> </label>
              <input type="date" placeholder="Enter your Appointment" autoComplete="off" name="dateofRequired" className="input-box" onChange={(e) => setdateofRequired(e.target.value)} />
            </div>

            <div className="col">
              <label htmlFor="timeofRequired"> <strong>Time Of Required</strong> </label>
              <input type="time" placeholder="Enter Time of Required" autoComplete="off" name="timeofRequired" className="input-box" onChange={(e) => settimeofRequired(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="natureofDuty"><strong>Nature Of Duty</strong></label>
              <select
                name="natureofDuty"
                className="input-box"
                onChange={(e) => setnatureofDuty(e.target.value)}
                value={natureofDuty}
                required
              >
                <option value="">Select Nature of Duty</option>
                <option value="Official ">Official</option>
                <option value="Privet ">Privet</option>
              </select>
            </div>


            <div className="col">
              <label htmlFor="addresstoGo"> <strong>Address To Go</strong> </label>
              <input
                type="text" placeholder="Enter Address to Go" autoComplete="off" name="addresstoGo" className="input-box" onChange={(e) => setaddresstoGo(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="requirement"> <strong>Requirement</strong> </label>
              <input type="text" placeholder="Enter Requirement" autoComplete="off" name="requirement" className="input-box" onChange={(e) => setrequirement(e.target.value)} />
            </div>

            <div className="col">
              <label htmlFor="timetobeSpent"> <strong>Time To Be Spent</strong> </label>
              <input type="text" placeholder="Enter Hours" autoComplete="off" name="timetobeSpent" className="input-box" onChange={(e) => settimetobeSpent(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="distance"> <strong>Distance</strong> </label>
              <input type="text" placeholder="Enter Distance" autoComplete="off" name="distance" className="input-box" onChange={(e) => setdistance(e.target.value)} />
            </div>

            <div className="col">
              <label htmlFor="dateofArrival">
                <strong>Date Of Arrival</strong>
              </label>
              <input type="date" placeholder="Enter Date of Arrival" autoComplete="off" name="dateofArrival" className="input-box" onChange={(e) => setdateofArrival(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="timeofArrival"> <strong>Time Of Arrival</strong> </label>
              <input
                type="time" placeholder="Enter Time of Arrival" autoComplete="off" name="timeofArrival" className="input-box" onChange={(e) => settimeofArrival(e.target.value)} />
            </div>

            <div className="col">
              <label htmlFor="numofOfficers"> <strong>Number Of Officers</strong> </label>
              <input type="number" placeholder="Enter No. of Officers" autoComplete="off" name="numofOfficers" className="input-box" onChange={(e) => { setnumofOfficers(e.target.value); calculateTotalPassengers(); }} />
            </div>
            <div className="col">
              <label htmlFor="numofLectures"> <strong>Number of Lectures</strong> </label>
              <input type="number" placeholder="Enter No. of Lectures" autoComplete="off" name="numofLectures" className="input-box" onChange={(e) => { setnumofLectures(e.target.value); calculateTotalPassengers(); }} />
            </div>

            <div className="col">
              <label htmlFor="numofInstructors"> <strong>Number Of Instructors</strong> </label>
              <input
                type="number" placeholder="Enter No. of Instructors" autoComplete="off" name="numofInstructors" className="input-box" onChange={(e) => { setnumofInstructors(e.target.value); calculateTotalPassengers(); }} />
            </div>
            <div className="col">
              <label htmlFor="numofcadetOfficers"> <strong>Number Of Cadet Officers</strong> </label>
              <input type="number" placeholder="Enter No. of Cadet Officers" autoComplete="off" name="numofcadetOfficers" className="input-box" onChange={(e) => { setnumofcadetOfficers(e.target.value); calculateTotalPassengers(); }} />
            </div>

            <div className="col">
              <label htmlFor="numofdayScholers"> <strong>Number Of Day Scholers</strong> </label>
              <input type="number" placeholder="Enter No. of DayScholers" autoComplete="off" name="numofdayScholers" className="input-box" onChange={(e) => { setnumofdayScholers(e.target.value); calculateTotalPassengers(); }} />
            </div>
            <div className="col">
              <label htmlFor="numofcivilStaff"> <strong>Number Of Civil Staff</strong> </label>
              <input type="number" placeholder="Enter No. of Civil Staff" autoComplete="off" name="numofcivilStaff" className="input-box" onChange={(e) => { setnumofcivilStaff(e.target.value); calculateTotalPassengers(); }} />
            </div>

            <div className="col">
              <label htmlFor="Total of Passengers"> <strong>Total Of Passengers</strong> </label>
              <input
                type="number"
                placeholder="Enter Total of Passengers"
                autoComplete="off"
                name="totalofPassengers"
                className="input-box"
                value={totalofPassengers}
                readOnly // Make the input field read-only
              />
            </div>
            <div className="col">
              <label htmlFor="routetoFollow"> <strong>Route To Follow</strong> </label>
              <input type="text" placeholder="Enter Route to Follow" autoComplete="off" name="routetoFollow" className="input-box" onChange={(e) => setroutetoFollow(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="dateofApply"> <strong>Date Of Apply</strong> </label>
              <input
                type="date"
                placeholder="Enter Date of Apply"
                autoComplete="off"
                name="dateofApply"
                className="input-box"
                value={dateofApply}
                onChange={(e) => setdateofApply(e.target.value)}
              />
            </div>

            <div className="col">
              <button type="submit" className="SAddbtn"> Submit </button>
            </div>
          </div>
        </form>
      </div>

      <p className="msg">
        If You Canceled a Request,<br />Please Contact MTO Office
      </p>
    </>
  );
}

export default Home;
