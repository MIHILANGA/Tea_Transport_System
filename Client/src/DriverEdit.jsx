import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/DriverEdit.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedIndex, setEditedIndex] = useState(-1); // Track the index of the edited row

  useEffect(() => {
    // Fetch driver data from the server when the component mounts
    axios.get('https://kdu-tms.onrender.com/getAllDriver')
      .then(response => {
        setFormData(response.data.data);
        setLoading(false); // Data has been loaded
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching driver data:', error);
        setLoading(false); // Error occurred while loading data
      });
  }, [showNotification]);

  // Handle cell click for editing
  const handleCellClick = (rowIndex) => {
    setEditedIndex(rowIndex); // Set the edited row index
  };

  // Handle cell change for editing
  const handleCellChange = (rowIndex, columnName, newValue) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][columnName] = newValue;
    setFormData(updatedFormData);
  };

  // Handle form submit to save edited data
  const handleFormSubmit = (index) => {
    const updatedForm = formData[index];

    // Update the data in the MongoDB database
    axios.post('https://kdu-tms.onrender.com/updateDriverDatas', {
      id: updatedForm._id,
      updatedData: updatedForm,
    })
    .then(response => {
      console.log('Driver data updated in MongoDB:', response.data);
      alert('Data Update successfully!');
      setEditedIndex(-1); // Reset the editedIndex after saving
    })
    .catch(error => {
      console.error('Error updating driver data in MongoDB:', error);
      alert('Data Update error!');
    });
  };

  // Handle delete
  const handleDelete = (id) => {
    // Delete data from the MongoDB database
    axios.post('https://kdu-tms.onrender.com/deleteDriverData', {
      id: id,
    })
    .then(response => {
      console.log('Driver data deleted from MongoDB:', response.data);
      // Refresh driver data after deletion
      axios.get('https://kdu-tms.onrender.com/getAllDriver')
        .then(response => {
          setFormData(response.data.data);
          alert('Driver data deleted successfully!');
        })
        .catch(error => {
          console.error('Error fetching updated driver data:', error);
          alert('Driver data deletion error!');
        });
    })
    .catch(error => {
      console.error('Error deleting driver data from MongoDB:', error);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <><div className='header-rectangle' />
    <img className='logo' alt='Kotelawala defence' src='kdu.png' />
    <button type='button' className='backbtn' onClick={() => window.history.back()}> Back </button>
   
    <div className="mid-container">
        <table className="Dtable">
        <thead className='fixed-headerD'>
            <tr>
              <th>Register Number</th>
              <th>Driver Name</th>
              <th>Telephone Number</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.regnumber}
                      onChange={(e) => handleCellChange(index, 'regnumber', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index)}>{form.regnumber}</span>
                  )}
                </td>

                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.drivername}
                      onChange={(e) => handleCellChange(index, 'drivername', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index)}>{form.drivername}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.Telephone}
                      onChange={(e) => handleCellChange(index, 'Telephone', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index)}>{form.Telephone}</span>
                  )}
                </td>
                <td>
                    {editedIndex === index ? (
                      <select
                        value={form.driveravailability}
                        onChange={(e) => handleCellChange(index, 'driveravailability', e.target.value)}
                      >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                    ) : (
                      <span onClick={() => handleCellClick(index)}>{form.driveravailability}</span>
                    )}
                  </td>



                  <td>
                  {editedIndex === index ? (
                    <button className='savebtn' onClick={() => handleFormSubmit(index)}>Save</button>
                  ) : (
                    <>
                      <button className='savebtn' onClick={() => handleCellClick(index)}>Edit</button>
                      <button className='deletebtn' onClick={() => handleDelete(form._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
  );
}

export default FormD;