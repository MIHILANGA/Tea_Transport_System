import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './CSS/FullFormD.css';

function FullFormFormD({ showNotification, onNewRequestsCountChange }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);
  const [insuranceMessage, setInsuranceMessage] = useState('');

  useEffect(() => {
    const urls = [
      'https://kdu-tms.onrender.com/getAllForm',
      'https://kdu-tms.onrender.com/getAllForm1',
      'https://kdu-tms.onrender.com/getAllForm2',
      'https://kdu-tms.onrender.com/getAllForm3',
    ];

    Promise.all(urls.map(url => axios.get(url)))
      .then(responses => {
        const combinedData = responses.map(response => response.data.data);
        const mergedData = [].concat(...combinedData);

        const sortedData = mergedData.sort((a, b) => {
          const dateA = new Date(a.dateofApply);
          const dateB = new Date(b.dateofApply);

          return dateB - dateA;
        });
        const newRequestsCount = sortedData.filter(form => !form.rejectOrConfirm).length;

        // Update the new requests count in the parent component
        onNewRequestsCountChange(newRequestsCount);

        setFormData(sortedData);

        const filteredData = sortedData.map(form => ({
          ...form,
          rejectOrConfirm: '',
          message: '',
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [showNotification]);

  useEffect(() => {
    const newForms = formData.filter(form => !form.rejectOrConfirm);
    if (newForms.length > 0) {
      const newNotifications = newForms.map(form => ({
        type: 'info',
       
      }));
      setNotifications([...notifications, ...newNotifications]);
    }
  }, [formData, notifications]);

  useEffect(() => {
    axios.get('https://kdu-tms.onrender.com/getAllVehicle')
      .then(response => {
        const today = new Date();
        const vehicleData = response.data.data;

        const matchingVehicles = vehicleData.filter(vehicle => {
          const insurancedate = new Date(vehicle.insurancedate);
          const timeDifference = insurancedate.getTime() - today.getTime();
          const daysDifference = timeDifference / (1000 * 3600 * 24);

          if (daysDifference <= 5 && daysDifference >= 0) {
            setInsuranceMessage('Insurance expired date coming soon for some vehicles.');
          }
        });
      })
      .catch(error => {
        console.error('Error fetching vehicle data:', error);
      });
  }, []);

  return (
    <div className="form-container2">
      {/* Render Insurance Message */}
      {insuranceMessage && (
        <div className="record-box1 insurance-message">
          <p className="insurance-message-text">{insuranceMessage}</p>
        </div>
      )}

      {/* Render each record in a separate box */}
      {formData.map((form, index) => {
        if (form.rejectOrConfirm) {
          return null;
        }

        return (
          <div className="record-box1" key={index}>
            <p className="applicant-name">Applicant Name: {form.applicantname}</p>
            <p className="requested-date1">
              Requested date: {new Date(form.dateofApply).toLocaleDateString()} <p className="Name">Pending</p>
            </p>
            <p className="description">Description: {form.requirement}</p>
            {/* Add more data fields as needed */}
          </div>
        );
      })}

      {/* Render Notifications */}
      <div>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map((notification, index) => (
            <Notification key={index} message={notification.message} type={notification.type} />
          ))
        )}
      </div>
    </div>
  );
}

export default FullFormFormD;
