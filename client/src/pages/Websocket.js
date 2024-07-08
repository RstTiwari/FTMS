// // App.js
// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// let url = process.env.REACT_APP_WS_PROD;

// if (process.env.NODE_ENV === "development") {
//     url = process.env.REACT_APP_WS_LOCAL;
// }

// const socket = io(url, {
//     connectionStateRecovery: true,
//     path: "/ws/",
// }); // Replace with your server URL

// const SocketIo = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState(""); 

//     useEffect(() => {
//         socket.on("message", (data) => {
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { text: data, sender: "server" },
//             ]);
//         });

//         return () => {
//             socket.off("message"); // Disconnect the socket when the component unmounts
//         };
//     }, [socket]);

//     const handleMessageChange = (e) => {
//         setInputMessage(e.target.value);
//     };

//     const sendMessage = () => {
//         if (inputMessage.trim() !== "") {
//             // Send the message to the server
//             setMessages([
//                 ...messages,
//                 { text: inputMessage, sender: "client" },
//             ]);
//             socket.emit("message", inputMessage);
//             setInputMessage("");
//         }
//     };

//     return (
//         <div>
//             <h1>Simple Chat</h1>
//             <div
//                 style={{
//                     height: "300px",
//                     overflowY: "scroll",
//                     border: "1px solid #ccc",
//                     marginBottom: "10px",
//                 }}
//             >
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             textAlign:
//                                 message.sender === "client" ? "right" : "left",
//                             padding: "5px",
//                             color:
//                                 message.sender === "client" ? "yellow" : "blue",
//                         }}
//                     >
//                         {message.text}
//                     </div>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={handleMessageChange}
//                 placeholder="Type your message..."
//                 style={{ marginRight: "10px", padding: "20px" }}
//             />
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default SocketIo;
