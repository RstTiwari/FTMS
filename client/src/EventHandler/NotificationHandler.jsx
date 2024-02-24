import React from 'react';
import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 1,
  maxCount:1,
  zIndex: 1000000000, // Set the desired z-index value
});

const NotificationHandler = {
  success: (message) => {
   return notification.success({
      message: 'Success',
      description: message,
    });
  },
  error: (message) => {
   return notification.error({
      message: 'Error',
      description: message,
      
    });
  },
};

export default NotificationHandler;
