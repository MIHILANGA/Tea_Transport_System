import React, { useState, useEffect } from 'react';
import './CSS/Notification.css';

const Notification = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Hide the notification after 3 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`notification ${type} ${isVisible ? 'visible' : ''}`}>
      {message}
    </div>
  );
};

export default Notification;