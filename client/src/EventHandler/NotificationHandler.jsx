import React from "react";
import { message } from "antd";

message.config({
    duration: 5, // Duration in seconds
    maxCount: 1, // Maximum count of messages at one time
});

const NotificationHandler = {
    success: (content) => {
        return message.success({
            content: content,
            className: 'custom-class',
            style: {
                zIndex: 1000000000, // Set the desired z-index value
            },
        });
    },
    error: (content) => {
        return message.error({
            content: content,
            className: 'custom-class',
            style: {
                zIndex: 1000000000, // Set the desired z-index value
            },
        });
    },
};

export default NotificationHandler;
