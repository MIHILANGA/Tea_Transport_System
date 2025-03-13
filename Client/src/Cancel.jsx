import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(-1); // Track the index of the edited row
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(-1); // Track the index of the expanded record

  useEffect(() => {
    // Fetch form data from the server when the component mounts
    axios.get('https://kdu-tms.onrender.com/getAllForm')
      .then(response => {
        // Reverse the data array to display it in reverse order
        const reversedData = response.data.data.reverse();
        setFormData(reversedData);
        setLoading(false); // Data has been loaded
        // Filter and prepare the data for the notification
        const filteredData = reversedData.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        setLoading(false); // Error occurred while loading data
      });
  }, [showNotification]);

  // Handle cell click for editing
  const handleCellClick = (rowIndex, columnName) => {
    setEditingIndex(rowIndex); // Set the edited row index
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
    axios.post('https://kdu-tms.onrender.com/updateFormDatas', {
      id: updatedForm._id,
      updatedData: updatedForm,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
      alert('Data Update successfully!');
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
      alert('Data Update error!');
    });

    // Reset the editing index after saving
    setEditingIndex(-1);
  };

  // Handle delete
  const handleDelete = (id) => {
    // Delete data from the MongoDB database
    axios.post('https://kdu-tms.onrender.com/deleteFormData', {
      id: id,
    })
    .then(response => {
      console.log('Form data deleted from MongoDB:', response.data);
      // Refresh form data after deletion
      axios.get('https://kdu-tms.onrender.com/getAllForm')
        .then(response => {
          setFormData(response.data.data);
          alert('Request Form Cancel successfully!');
        })
        .catch(error => {
          console.error('Error fetching updated form data:', error);
          alert('Request Form Cancel Error!');
        });
    })
    .catch(error => {
      console.error('Error deleting form data from MongoDB:', error);
    });
  };

  // Function to calculate total passengers
  const calculateTotal = (form) => {
    return (
      form.numofOfficers +
      form.numofLectures +
      form.numofInstructors +
      form.numofCadetOfficers +
      form.numofDayScholars +
      form.numofCivilStaff
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type='button' className='backbtn' onClick={() => window.history.back()}> Back </button>

      <div className="Smid-container">
        {formData.map((form, index) => (
          <div className="record-boxA" key={index}>

            <p className="applicant-name">
              Applicant Name:
              {editingIndex === index ? (
                <input
                  type="text"
                  value={formData[index].applicantname}
                  onChange={(e) => handleCellChange(index, 'applicantname', e.target.value)}
                />
              ) : (
                <span>{form.applicantname}</span>
              )}
            </p>
            <p className="requested-date">Requested date: {form.dateofApply}</p>

            {/* Render additional details */}
            {expandedRecordIndex === index && (
              <div className="Sdetails">

                <p className="expanded-detail">Vehicle Incharge :
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={form.vehicleIncharge}
                      onChange={(e) => handleCellChange(index, 'vehicleIncharge', e.target.value)}
                    />
                  ) : (
                    <span>{form.vehicleIncharge} </span>
                  )}
                </p>

                <p className="expanded-detail">Date Required :
                  {editingIndex === index ? (
                    <input
                      type="Date"
                      value={form.dateofRequired}
                      onChange={(e) => handleCellChange(index, 'dateofRequired', e.target.value)}
                    />
                  ) : (
                    <span>{form.dateofRequired}</span>
                  )}
                </p>

                <p className="expanded-detail">Time of Required :
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={form.timeofRequired}
                      onChange={(e) => handleCellChange(index, 'timeofRequired', e.target.value)}
                    />
                  ) : (
                    <span>{form.timeofRequired}</span>
                  )}
                </p>

                <p className="expanded-detail">Nature of Duty :
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={form.natureofDuty}
                      onChange={(e) => handleCellChange(index, 'natureofDuty', e.target.value)}
                    />
                  ) : (
                    <span>{form.natureofDuty}</span>
                  )}
                </p>

                <p className="expanded-detail">Address :
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={form.addresstoGo}
                      onChange={(e) => handleCellChange(index, 'addresstoGo', e.target.value)}
                    />
                  ) : (
                    <span>{form.addresstoGo}</span>
                  )}
                </p>

                <div className="Sdetail-row2">
                  <p className="expanded-detail">Requirement :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.requirement}
                        onChange={(e) => handleCellChange(index, 'requirement', e.target.value)}
                      />
                    ) : (
                      <span>{form.requirement}</span>
                    )}
                  </p>

                  <p className="expanded-detail">Time to be Spent :
                    {editingIndex === index ? (
                      <input
                        type="time"
                        value={form.timetobeSpent}
                        onChange={(e) => handleCellChange(index, 'timetobeSpent', e.target.value)}
                      />
                    ) : (
                      <span>{form.timetobeSpent}</span>
                    )}
                  </p>

                  <p className="expanded-detail">Distance :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.distance}
                        onChange={(e) => handleCellChange(index, 'distance', e.target.value)}
                      />
                    ) : (
                      <span>{form.distance}</span>
                    )}
                  </p>

                  <p className="expanded-detail">Date Arrival :
                    {editingIndex === index ? (
                      <input
                        type="date"
                        value={form.dateofArrival}
                        onChange={(e) => handleCellChange(index, 'dateofArrival', e.target.value)}
                      />
                    ) : (
                      <span>{form.dateofArrival}</span>
                    )}
                  </p>

                  <p className="expanded-detail">Time Arrival :
                    {editingIndex === index ? (
                      <input
                        type="time"
                        value={form.timeofArrival}
                        onChange={(e) => handleCellChange(index, 'timeofArrival', e.target.value)}
                      />
                    ) : (
                      <span>{form.timeofArrival}</span>
                    )}
                  </p>
                </div>
                <div className="Sdetail-row3">
                  <p className="expanded-detail">No. Of Officers :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofOfficers}
                        onChange={(e) => handleCellChange(index, 'numofOfficers', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofOfficers}</span>
                    )}
                  </p>

                  <p className="expanded-detail">No. Of Lectures :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofLectures}
                        onChange={(e) => handleCellChange(index, 'numofLectures', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofLectures}</span>
                    )}
                  </p>

                  <p className="expanded-detail">No. Of Instructors :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofInstructors}
                        onChange={(e) => handleCellChange(index, 'numofInstructors', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofInstructors}</span>
                    )}
                  </p>
                </div>
                <div className="Sdetail-row">
                  <p className="expanded-detail">No. Of Cadet Officers :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofcadetOfficers}
                        onChange={(e) => handleCellChange(index, 'numofCadetOfficers', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofcadetOfficers}</span>
                    )}
                  </p>

                  <p className="expanded-detail">No. Of DayScholers:
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofdayScholers}
                        onChange={(e) => handleCellChange(index, 'numofDayScholars', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofdayScholers}</span>
                    )}
                  </p>

                  <p className="expanded-detail">No. Of CivilStaff :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.numofcivilStaff}
                        onChange={(e) => handleCellChange(index, 'numofCivilStaff', e.target.value)}
                      />
                    ) : (
                      <span>{form.numofcivilStaff}</span>
                    )}
                  </p>
                </div>
                <p className="expanded-detail">Total Passangers :
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={form.totalofPassengers}
                        onChange={(e) => handleCellChange(index, 'numofCivilStaff', e.target.value)}
                      />
                    ) : (
                      <span>{form.totalofPassengers}</span>
                    )}
                  </p>
              </div>
            )}

            {/* Edit button */}
            <button
              className="action-buttonSave"
              onClick={() => {
                if (editingIndex === index) {
                  // Save changes when clicking "Edit" again
                  handleFormSubmit(index);
                } else {
                  // Toggle editing mode
                  setEditingIndex(index);
                }
              }}
            >
              {editingIndex === index ? 'Save' : 'Edit'}
            </button>

            {/* Delete button */}
            <button className="action-buttonDelete" onClick={() => handleDelete(form._id)}>
              Delete
            </button>

            {/* Hide/Show Details button */}
            <button
              className="action-button-showmore"
              onClick={() =>
                setExpandedRecordIndex(prevIndex => (prevIndex === index ? -1 : index))
              }
            >
              {expandedRecordIndex === index ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FormD;
