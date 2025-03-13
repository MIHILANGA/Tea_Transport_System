import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Vehicledetails.css';
import AddVehiclePopup from './AddVehiclePopup';
import Switch from 'react-switch';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    axios
      .get('https://kdu-tms.onrender.com/getAllVehicle')
      .then((response) => {
        setFormData(response.data.data);
        const filteredData = response.data.data.map((form) => ({
          ...form,
          isEditing: false,
        }));
        showNotification(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  const fetchData = async () => {
    const response = await axios.get('https://kdu-tms.onrender.com/getAllVehicle');
    const data = response.data.data;
    setFormData(data);
  };

  const handleAvailabilityChange = (index, checked) => {
    const updatedFormData = [...formData];
    updatedFormData[index].vehicleAvailability = checked;

    const dataToUpdate = {
      id: updatedFormData[index]._id,
      updatedData: { vehicleAvailability: checked },
    };

    axios
      .post('https://kdu-tms.onrender.com/updateVehicleDatas', dataToUpdate)
      .then((response) => {
        console.log('Vehicle availability updated:', response.data);
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating vehicle availability:', error);
      });
  };

  // Function to check if a date is within 5 days from the current date
  function isWithin5Days(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
    const dateToCheck = new Date(dateString);
    const fiveDaysFromToday = new Date(today);
    fiveDaysFromToday.setDate(today.getDate() + 5); // Calculate 5 days from today

    return dateToCheck >= today && dateToCheck <= fiveDaysFromToday;
  }

  const renderTableRows = () => {
    return formData.map((form, index) => (
      <tr key={index}>
        <td>{form.vehiclenumber}</td>
        <td>{form.vehicletype}</td>
        <td>{form.vehiclemodel}</td>
        <td>{form.vehicleowner}</td>
        <td>{new Date(form.registerdate).toISOString().split('T')[0]}</td>
        <td className={isWithin5Days(form.insurancedate) ? 'today-insurance-date' : ''}>
          {new Date(form.insurancedate).toLocaleDateString()}
        </td>
        <td>
          <Switch
            onChange={(checked) => handleAvailabilityChange(index, checked)}
            checked={form.vehicleAvailability}
          />
        </td>
      </tr>
    ));
  };

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>
        Back
      </button>

      <div style={{ flex: 1, padding: '10px' }}>
        <div className='Buttons'>
          <div>{currentDateTime.toLocaleString()}</div>
          <button className='Addvehiclebtn' onClick={showPopup}>
            Add
          </button>
          <Link to='/vehicleedit' className='Editvehiclebtn'>
            Edit
          </Link>
          <Link to='/Locatin' className='Editvehiclebtn'>
            Locate<br></br> Vehicles 
          </Link>
          <Link to='/Maintains' className='Editvehiclebtn'>
            Maintenance<br></br> Insurance
          </Link>
        </div>
      </div>

      <div className='notification-panelV'>
        <table className='Vehicledata-table'>
          <div className='table-container'>
            <thead className='fixed-header'>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle type</th>
                <th>Vehicle Model</th>
                <th>Vehicle A.P</th>
                <th>Register Date</th>
                <th>Insurance Date</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </div>
        </table>
      </div>

      {isPopupVisible && <AddVehiclePopup onClose={hidePopup} onAdd={fetchData} />}
    </>
  );
}

export default FormD;
