import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success'; // Currently only success is needed, can be expanded.
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Set timeout to automatically close
    const timer = setTimeout(() => {
      handleClose();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [message]); // Rerun effect if message changes to reset timer

  const handleClose = () => {
    setVisible(false);
    // Allow animation to finish before calling onClose
    setTimeout(onClose, 300); 
  };
  
  const baseClasses = "fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-600 bg-white rounded-lg shadow-2xl dark:text-gray-300 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out";
  const visibilityClasses = visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';

  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
      </svg>
    ),
  };

  const iconContainerClasses = {
    success: 'bg-green-100 dark:bg-green-900',
  };

  return (
    <div className={`${baseClasses} ${visibilityClasses}`} role="alert">
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${iconContainerClasses[type]}`}>
        {icons[type]}
      </div>
      <div className="pl-3 text-sm font-normal">{message}</div>
      <button onClick={handleClose} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    </div>
  );
};

export default Notification;
