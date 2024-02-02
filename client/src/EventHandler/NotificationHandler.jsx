import React from 'react';
import { notification } from 'antd';

notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 2.5,
  maxCount:1
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
