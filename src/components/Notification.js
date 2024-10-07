// components/Notification.js
import React, { useState, useEffect } from 'react';
//import './Notification.css'; // Import CSS for styling

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 3000); // Hide notification after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    visible && message ? (
      <div className="notification">
        <p>{message}</p>
      </div>
    ) : null
  );
};

export default Notification;
