// components/NotificationModal.js
import React, { useEffect } from 'react';

const NotificationModal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Hide after 5 seconds
    return () => clearTimeout(timer);
  }, [message, onClose]);

  return (
    message ? (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <p className="text-lg text-gray-900">{message}</p>
        </div>
      </div>
    ) : null
  );
};

export default NotificationModal;
