import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './CSS/FormD.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);

  useEffect(() => {
    fetchFormData('https://kdu-tms.onrender.com/getAllForm', '');
  }, []);

  const fetchFormData = (url, formType) => {
    axios
      .get(url)
      .then((response) => {
        const formDataWithTypes = response.data.data.map((form) => ({
          ...form,
          formType,
          message: '',
        }));
        setFormData(formDataWithTypes.reverse());
        showNotification(formDataWithTypes);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  };

  const handleRejectConfirmChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = value;
    updatedFormData[index].rejectOrConfirm1 = value;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index, updateEndpoint) => {
    const updatedFormData = [...formData];
    const { _id, rejectOrConfirm, rejectOrConfirm1, message } = updatedFormData[index];

    axios
      .post(updateEndpoint, {
        id: _id,
        rejectOrConfirm: rejectOrConfirm,
        rejectOrConfirm1: rejectOrConfirm1,
        message: message,
      })
      .then((response) => {
        console.log('Form data updated in MongoDB:', response.data);
        setNotifications([
          ...notifications,
          { message: 'Confirmation Data Updated Successfully!', type: 'success' },
        ]);
      })
      .catch((error) => {
        console.error('Error updating form data in MongoDB:', error);
        setNotifications([
          ...notifications,
          { message: 'Confirmation Data Update Error!', type: 'error' },
        ]);
      });
  };

  const handleConfirm = (index) => {
    const updateEndpoint = `https://kdu-tms.onrender.com/updateFormData${formData[index].formType}`;
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = 'Confirmed';
    updatedFormData[index].rejectOrConfirm1 = 'Pending';
    updatedFormData[index].message = 'Request Confirmed';
    setFormData(updatedFormData);
    handleFormSubmit(index, updateEndpoint);
  };

  const handleReject = (index) => {
    const updateEndpoint = `https://kdu-tms.onrender.com/updateFormData${formData[index].formType}`;
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = 'Rejected';
    updatedFormData[index].rejectOrConfirm1 = 'Rejected';
    updatedFormData[index].message = 'Request Rejected';
    setFormData(updatedFormData);
    handleFormSubmit(index, updateEndpoint);
  };

  const toggleExpanded = (index) => {
    if (expandedRecordIndex === index) {
      setExpandedRecordIndex(null);
    } else {
      setExpandedRecordIndex(index);
    }
  };

  const handlePrint = (index) => {
    const printWindow = window.open('', '', 'width=1000,height=600');

    const printContent = `
    <html>
      <head>
        <title></title>
      </head>
      <body>
        <h2><center>Sir John Kotelwala Defence University -Southern Campus </center></h2>
        <h3><center>Application For Transport Requirment</center></h3><br/>
        <p>Applicant Name: ${formData[index].applicantname}</p>
        <p>Vehicle in Charge: ${formData[index].vehicleIncharge}</p>
        <p>Required date: ${formData[index].dateofRequired}</p>
        <p>Required Time: ${formData[index].timeofRequired}</p>

        <p>Nature of Duty: ${formData[index].natureofDuty}</p>
        <p>Address to Go: ${formData[index].addresstoGo}</p>
        <p>Requirment: ${formData[index].requirement}</p>
        <p>TimetobeSpent:${formData[index].timeofRequired}</p>
        <p>Distance::${formData[index].distance}</p>

        <p>Date of arrival: ${formData[index].natureofDuty}</p>
        <p>TIme of arrival: ${formData[index].addresstoGo}</p><br/>

        <p>Number of officers: ${formData[index].numofOfficers}</p>
        <p>Number of lecturers:${formData[index].numofLectures}</p>
        <p>Number of Instruction:${formData[index].numofInstructors}</p>
        <p>Number of Cadet Officers: ${formData[index].numofcadetOfficers}</p>
        <p>Number of Day SCholers:${formData[index].numofdayScholers}</p>
        <p>Number of Civil Staff:${formData[index].numofcivilStaff}</p><br/>
        <p>Total Passengers:${formData[index].totalofPassengers}</p>

        <p>Route to Follow:${formData[index].routetoFollow}</p><br/><br/>

        <h3><right> Rector (Southern Campus)</right></h3>


        <!-- Include other form details here -->
      </body>
    </html>
  `;


    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();


    printWindow.print();
    printWindow.close();
  };


  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>Back</button>

      <div className="buttons-container">
        <button className='btn1' onClick={() => fetchFormData('https://kdu-tms.onrender.com/getAllForm', '')}>
          FOC
        </button>
        <button className='btn2' onClick={() => fetchFormData('https://kdu-tms.onrender.com/getAllForm1', '1')}>
          FBESS
        </button>
        <button className='btn3' onClick={() => fetchFormData('https://kdu-tms.onrender.com/getAllForm2', '2')}>
          FOT
        </button>
        <button className='btn4' onClick={() => fetchFormData('https://kdu-tms.onrender.com/getAllForm3', '3')}>
          OTHER
        </button>
      </div>

      <div className='notification-panel'>
        {formData.map((form, index) => {
          const total =
            form.numofOfficers +
            form.numofLectures +
            form.numofInstructors +
            form.numofcadetOfficers +
            form.numofdayScholers +
            form.numofcivilStaff;

          // Determine the CSS class based on the value of rejectOrConfirm
          const recordBoxClass = form.rejectOrConfirm === 'Confirmed' ? 'confirm' : (form.rejectOrConfirm === 'Rejected' ? 'reject' : '');

          return (
            <div className={`record-box ${recordBoxClass}`} key={index}>
              <p className="applicant-name">Applicant Name: {form.applicantname}</p>
              <p className="requested-date">Requested date:{new Date(form.dateofApply).toISOString().split('T')[0]}
</p>
               <br />

              {expandedRecordIndex === index && (
                <div className="details">
                  <p className="expanded-detail"> <b>Vehicle Incharge : </b> {form.vehicleIncharge}</p>
                  <p className="expanded-detail"><b>Date Required : </b>{new Date(form.dateofRequired).toISOString().split('T')[0]}</p>
                  <p className="expanded-detail"><b>Time Required : </b>{form.timeofRequired}</p>
                  <p className="expanded-detail"><b>Nature of Duty : </b>{form.natureofDuty}</p>
                  <p className="expanded-detail"><b>Address : </b>{form.addresstoGo}</p><br />

                  <div className="detail-row">
                    <p className="expanded-detail"><b>Requirement : </b>{form.requirement}</p>
                    <p className="expanded-detail"><b>Time to be Spent : </b>{form.timetobeSpent}</p>
                    <p className="expanded-detail"><b>Distance : </b>{form.distance}</p>
                    <p className="expanded-detail"><b>Date Arrival: </b>{new Date(form.dateofArrival).toISOString().split('T')[0]}</p>
                    <p className="expanded-detail"><b>Time Arrival: </b>{form.timeofArrival}</p><br />
                  </div>
                  <div className="detail-row1">
                    <p className="expanded-detail"><b>No. Of Officers : </b>{form.numofOfficers}</p>
                    <p className="expanded-detail"><b>No. Of Lectures : </b>{form.numofLectures}</p>
                    <p className="expanded-detail"><b>No. Of Instructors : </b>{form.numofInstructors}</p><br />
                  </div>
                  <div className="detail-row2">
                    <p className="expanded-detail"><b>No. Of CivilStaff : </b>{form.numofcivilStaff}</p>
                    <p className="expanded-detail"><b>No. Of Cadet Officers : </b>{form.numofcadetOfficers}</p>
                    <p className="expanded-detail"><b>No. Of DayScholers: </b>{form.numofdayScholers}</p><br />
                  </div>
                  <p className="expanded-detail"><b>Total Passengers : </b>{total}</p>
                  <button className="print-button" onClick={() => handlePrint(index)}>Print</button>
                </div>
              )}

              <div className="reject-confirm-box">
                <input
                  type="text"
                  onChange={(e) => handleRejectConfirmChange(index, e.target.value)}
                  value={form.rejectOrConfirm}
                  readOnly
                />
              </div>
              <button className="action-button" onClick={() => handleConfirm(index)}> Confirm </button>
              <button className="action-button2" onClick={() => handleReject(index)}> Reject </button>
              <div>
                <button className="action-button-showmore" onClick={() => toggleExpanded(index)} >
                  {expandedRecordIndex === index ? "Hide Details" : "Show More"}
                </button>
              </div>
            </div>
          );
        })}

        <div>
          {notifications.map((notification, index) => (
            <Notification key={index} message={notification.message} type={notification.type} />
          ))}
        </div>
      </div>
    </>
  );
}

export default FormD;
