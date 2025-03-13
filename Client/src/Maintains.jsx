import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Vehicledetails.css';
import AddVehiclePopup from './AddVehiclePopup'; // Import the AddVehiclePopup component

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control popup visibility
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  //time an date showing
  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    // Fetch form data from the server
    axios
      .get('https://kdu-tms.onrender.com/getAllMaintain')
      .then((response) => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map((form) => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  // Function to fetch data from the database and populate the table
  const fetchData = async () => {
    const response = await axios.get('https://kdu-tms.onrender.com/getAllMaintain');
    const data = response.data.data;
    setFormData(data);
  };

  // Render the table with the fetched data
  const renderTable = () => {
    return (
      <div className='notification-panelVD'>
        <table className='Vehicledata-table'>
          <div className='table-container'>
            <thead className='fixed-header'>
              <tr>
                <th>Vehicle Number</th>
                <th>Maintanance Date</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <tr key={index}>
                  <td>{form.vehiclenumber}</td>
               
                  <td>{form.maintainsDate}</td>
                  <td>{form.price}</td>
                  <td>{form.Description}</td>
                

                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    );
  };

  // Function to show the popup form
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to hide the popup form
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/VehicleDetails'}>
        Back
      </button>

      {/* Left side with buttons */}
      <div style={{ flex: 1, padding: '10px' }}>
      <div className='Buttons'>

        {/* Show the popup form when the "Add" button is clicked */}
        <div>{currentDateTime.toLocaleString()}</div>
        
        <Link to='/MaintananceAdd' className='Editvehiclebtn'>
          Add
        </Link>
        <Link to='/Maintananceedit' className='Editvehiclebtn'>
          Edit
        </Link>
        
        {/* Display the current date and time */}
       
      </div>
      </div>

      {/* Render the table */}
      {renderTable()}

      {/* Render the popup form if isPopupVisible is true */}
      {isPopupVisible && <AddVehiclePopup onClose={hidePopup} onAdd={fetchData} />}
      
    </>
  );
}

export default FormD;