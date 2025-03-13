import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Driverdetails.css';
import AddDriverPopup from './AddDriverPopup'; // Import the AddDriverPopup component
import Switch from 'react-switch'; // Import the react-switch library

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control popup visibility

  useEffect(() => {
    // Fetch form data from the server
    axios
      .get('https://kdu-tms.onrender.com/getAllDriver')
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
    const response = await axios.get('https://kdu-tms.onrender.com/getAllDriver');
    const data = response.data.data;
    setFormData(data);
  };

  // Function to handle the change in driver availability
  const handleAvailabilityChange = (index, checked) => {
    // Clone the formData array to avoid mutating state directly
    const updatedFormData = [...formData];
    // Update the availability for the item at the specified index
    updatedFormData[index].driveravailability = checked;

    // Prepare the data to send to the server
    const dataToUpdate = {
      id: updatedFormData[index]._id, // Assuming you have an _id property
      updatedData: { driveravailability: checked },
    };

    // Send a request to update the availability on the server
    axios
      .post('https://kdu-tms.onrender.com/updateDriverDatas', dataToUpdate)
      .then((response) => {
        console.log('Driver availability updated:', response.data);

        // Update the local state with the updated data
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating driver availability:', error);
      });
  };

  // Render the table with the fetched data
  const renderTable = () => {
    return (
      <div className='notification-panelD'>
        <table className='driver-data-table'>
          <div className='table-containerD'>
            <thead className='fixed-header'>
              <tr>
                <th>Register Number</th>
                <th>Driver Name</th>
                <th>Telephone Number</th>
                <th>Driver Availability</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <tr key={index}>
                  <td>{form.regnumber}</td>
                  <td>{form.drivername}</td>
                  <td>{form.Telephone}</td>
                  <td>
                    {/* Use the Switch component here */}
                    <Switch
                      onChange={(checked) => handleAvailabilityChange(index, checked)}
                      checked={form.driveravailability} // Assuming form.driveravailability is a boolean
                    />
                  </td>
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

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // time and date showing
  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type='button' className='backbtn' onClick={() => window.history.back()}>
        Back
      </button>
      {/* Show the popup form when the "Add" button is clicked */}
      <div className='time'>{currentDateTime.toLocaleString()}</div>

      {/* Left side with buttons */}
      <div style={{ flex: 1, padding: '10px' }}>
        <div className='Buttons'>
          {/* Show the popup form when the "Add" button is clicked */}
          <button className='AddDriverbtn' onClick={showPopup}>
            Add
          </button>
          <Link to='/DriverEdit' className='EditDriverbtn'>
            Edit
          </Link>
        </div>
      </div>

      {/* Render the table */}
      {renderTable()}

      {/* Render the popup form if isPopupVisible is true */}
      {isPopupVisible && <AddDriverPopup onClose={hidePopup} onAdd={fetchData} />}
    </>
  );
}

export default FormD;
