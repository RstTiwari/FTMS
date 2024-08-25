import { message } from "antd";

// Configure the message component to allow only one message at a time
message.config({
    maxCount: 1,
    duration: 4,
});

const MessageHandler = {
    success: (content) => {
        return message.success({
            content: content || "Success", // Default message content if not provided
            className: "custom-class",
            style: {
                zIndex: 10000000000000, // Set the desired z-index value
            },
        });
    },
    error: (content) => {
        return message.error({
            content: content || "Error", // Default message content if not provided
            className: "custom-class",
            style: {
                zIndex: 10000000000000, // Set the desired z-index value
            },
        });
    },
    info: ({ content, duration = 3 }) => {
        return message.info({
            content: content || "Info", // Default message content if not provided
            className: "custom-class",
            duration: duration, // Duration the message is displayed
            style: {
                zIndex: 10000000000000, // Set the desired z-index value
            },
        });
    },
    warning: ({ content, duration = 3 }) => {
        return message.warning({
            content: content || "Warning", // Default message content if not provided
            className: "custom-class",
            duration: duration, // Duration the message is displayed
            style: {
                zIndex: 10000000000000, // Set the desired z-index value
            },
        });
    },
};

export default MessageHandler;
