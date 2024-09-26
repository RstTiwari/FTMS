import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SOCKET_SERVER_URL = process.env.NODE_ENV === "development" 
  ? "http://localhost:4009"
  : "your_production_url_here";

const socket = io(SOCKET_SERVER_URL, { path: "/ws/" });

const SocketComponent = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]); // State for notifications
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Socket connection
        socket.on("connect", () => {
            console.log("Connected to server with socket ID:", socket.id);
        });

        // Receive messages
        socket.on("message", (data) => {
            console.log("Message from server:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Receive notifications
        socket.on("notification", (notification) => {
            console.log("New notification received:", notification);
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

        return () => {
            socket.off("message");
            socket.off("notification");
            // socket.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            console.log("Sending message:", message);
            socket.emit("message", message);
            setMessage("");
        } else {
            console.log("Message is empty, not sending.");
        }
    };

    // Handle notification click
    const handleNotificationClick = (link) => {
        navigate(link); // Navigate to the specified link
    };

    return (
        <div>
            <h1>Socket.IO Chat</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
            <h2>Messages</h2>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification, index) => (
                    <li 
                        key={index} 
                        onClick={() => handleNotificationClick(notification.link)} // Handle click
                        style={{ cursor: 'pointer', color: notification.isRead ? 'gray' : 'blue' }} // Change color based on read status
                    >
                        <strong>{notification.type.toUpperCase()}: </strong>
                        {notification.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SocketComponent;
