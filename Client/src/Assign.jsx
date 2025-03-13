import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Assign.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [selectedFormType, setSelectedFormType] = useState('');
  const [driversList, setDriversList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);

  useEffect(() => {
    fetchFormData('https://kdu-tms.onrender.com/getAllForm', '');
    setSelectedFormType('FOC');
    fetchDriverData('https://kdu-tms.onrender.com/getAllDriver');
    fetchVehicleData('https://kdu-tms.onrender.com/getAllVehicle');
  }, []);

  const fetchFormData = (url, formType) => {
    axios
      .get(url)
      .then((response) => {
        const formDataWithTypes = response.data.data
          .filter((form) => form.rejectOrConfirm1 === 'Confirmed')
          .map((form) => ({
            ...form,
            rejectOrConfirm1: '',
            message: '',
            formType,
            isEditing: false,
            isCompleted: form.status === 'completed',
          }));
        setFormData(formDataWithTypes.reverse());
        showNotification(formDataWithTypes);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  };

  const fetchDriverData = (url) => {
    axios
      .get(url)
      .then((response) => {
        const driverData = response.data.data.map((driver) => driver.drivername);
        setDriversList(driverData);
      })
      .catch((error) => {
        console.error('Error fetching driver data:', error);
      });
  };

  const fetchVehicleData = (url) => {
    axios
      .get(url)
      .then((response) => {
        const vehicleData = response.data.data.map((vehicle) => vehicle.vehiclenumber);
        setVehiclesList(vehicleData);
      })
      .catch((error) => {
        console.error('Error fetching vehicle data:', error);
      });
  };

  const toggleExpanded = (index) => {
    if (expandedRecordIndex === index) {
      setExpandedRecordIndex(null);
    } else {
      setExpandedRecordIndex(index);
    }
  };

  const handleEditClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].isEditing = true;
    setFormData(updatedFormData);
  };

  const handleSaveClick = async (index) => {
    const editedForm = formData[index];

    if (editedForm.isCompleted) {
      return;
    }

    if (!driver || !vehicle) {
      return;
    }

    let updateUrl = '';

    if (selectedFormType === 'FOC') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData';
    } else if (selectedFormType === 'FBESS') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData1';
    } else if (selectedFormType === 'FOT') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData2';
    } else if (selectedFormType === 'OTHER') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData3';
    }

    try {
      const response = await axios.post(updateUrl, {
        id: editedForm._id,
        vehicle: vehicle,
        driver: driver,
        status: 'completed',
      });

      console.log('Form data updated in MongoDB:', response.data);

      setNotifications([
        ...notifications,
        { message: 'Data Updated Successfully!', type: 'success' },
      ]);

      const updatedFormData = [...formData];
      updatedFormData[index].isEditing = false;
      updatedFormData[index].isCompleted = true;
      updatedFormData[index].driver = driver;
      updatedFormData[index].vehicle = vehicle;

      setFormData(updatedFormData);

      // Optionally, you can add the updated driver and vehicle to the respective lists
      setDriversList([...driversList, driver]);
      setVehiclesList([...vehiclesList, vehicle]);
    } catch (error) {
      console.error('Error updating form data in MongoDB:', error);

      setNotifications([
        ...notifications,
        { message: 'Data Update Error!', type: 'error' },
      ]);
    }
  };

  const handleCancelEditClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].isEditing = false;
    setFormData(updatedFormData);
  };

  const handleDriverSelectChange = (index, value) => {
    setDriver(value);
  };

  const handleVehicleSelectChange = (index, value) => {
    setVehicle(value);
  };

  const handleCompleteClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].driver = 'Complete';
    updatedFormData[index].vehicle = 'Complete';
    updatedFormData[index].isCompleted = true;

    let updateUrl = '';

    if (selectedFormType === 'FOC') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData';
    } else if (selectedFormType === 'FBESS') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData1';
    } else if (selectedFormType === 'FOT') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData2';
    } else if (selectedFormType === 'OTHER') {
      updateUrl = 'https://kdu-tms.onrender.com/updateAssignData3';
    }

    axios
      .post(updateUrl, {
        id: updatedFormData[index]._id,
        driver: 'Complete',
        vehicle: 'Complete',
        status: 'completed',
      })
      .then((response) => {
        console.log('Data updated and uploaded to MongoDB:', response.data);
        setNotifications([
          ...notifications,
          { message: 'Data Updated and Uploaded Successfully!', type: 'success' },
        ]);
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating and uploading data to MongoDB:', error);
        setNotifications([
          ...notifications,
          { message: 'Data Update and Upload Error!', type: 'error' },
        ]);
      });
  };

  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>
        Back
      </button>

      <div className="buttons-container">
        <button className='btn1' onClick={() => {
          fetchFormData('https://kdu-tms.onrender.com/getAllForm', '');
          setSelectedFormType('FOC');
        }}>
          FOC
        </button>
        <button className='btn2' onClick={() => {
          fetchFormData('https://kdu-tms.onrender.com/getAllForm1', '1');
          setSelectedFormType('FBESS');
        }}>
          FBESS
        </button>
        <button className='btn3' onClick={() => {
          fetchFormData('https://kdu-tms.onrender.com/getAllForm2', '2');
          setSelectedFormType('FOT');
        }}>
          FOT
        </button>
        <button className='btn3' onClick={() => {
          fetchFormData('https://kdu-tms.onrender.com/getAllForm3', '3');
          setSelectedFormType('OTHER');
        }}>
          OTHER
        </button>
      </div>
      <div className='notification-panel'>
        <table className="data-table full-width">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Requirement</th>
              <th>Date of Required</th>
              <th>Total No Passengers</th>
              <th>Driver Name</th>
              <th>Vehicle</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>{form.applicantname}</td>
                <td>{form.requirement}</td>
                <td>{form.dateofRequired}</td>
                <td>{form.totalofPassengers}</td>
                
                <td>
                  {form.isEditing ? (
                    <select
                      value={driver}
                      onChange={(e) => handleDriverSelectChange(index, e.target.value)}
                      disabled={form.isCompleted}
                    >
                      <option value="">Select Driver</option>
                      {driversList.map((driver, driverIndex) => (
                        <option key={driverIndex} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  ) : (
                    form.driver
                  )}
                </td>
                <td>
                  {form.isEditing ? (
                    <select
                      value={vehicle}
                      onChange={(e) => handleVehicleSelectChange(index, e.target.value)}
                      disabled={form.isCompleted}
                    >
                      <option value="">Select Vehicle</option>
                      {vehiclesList.map((vehicle, vehicleIndex) => (
                        <option key={vehicleIndex} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}
                    </select>
                  ) : (
                    form.vehicle
                  )}
                </td>
                <td>
                  {form.isEditing ? (
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(index)}>Assign</button>
                  )}
                   {form.isEditing && (
                    <button onClick={() => handleCancelEditClick(index)}>Cancel</button>
                  )}
                </td>
                <td>
                  {!form.isCompleted && (
                    <button onClick={() => handleCompleteClick(index)}>Complete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormD;
