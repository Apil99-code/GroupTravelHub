// import React, { useEffect, useState, useMemo } from 'react';
// import Stack from '@mui/material/Stack';

// import Navbar from "../Components/Navbar";
// import '../Pages/groups.css';
// import { io } from 'socket.io-client';

// function Groups() {
//   const [message, setMessage] = useState(''); 
//   const [messages, setMessages] = useState([]); 
//   const [room, setRoom] = useState("");
//   const [socketID, setSocketID]=useState("");
//   // const [groups, setGroups] = useState([
//   //   { id: 1, name: "Friends" },
//   //   { id: 2, name: "Family" },
//   //   { id: 3, name: "Work" },
//   // ]); // Initial group data
//   // const [searchTerm, setSearchTerm] = useState('');
//   // const [newGroupName, setNewGroupName] = useState('');

//   const socket = useMemo(() => io("http://localhost:5000"), []);

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketID(socket.id);
//       console.log("Connected", socket.id);
//     });
  
//     socket.on("message", (newMessage) => {
//       setMessage((prevMessages) => [...prevMessages, newMessage]);
//     });
  
//     socket.on("recive-message", (data) => {
//       console.log(data);
//       setMessages((messages)=>[...message, data]); 
//     });
  
//     return () => {
//       console.log("Disconnecting socket");
//       socket.disconnect();
//     };
//   }, [socket]);
  
//   const handleSubmit = (e) => {
//     e.preventDefault(); 
//     if (message.trim()) {
//       socket.emit("message", {message, room}); 
//       setMessage((prevMessages) => [
//         ...prevMessages,
//         { user: "You", text: message },
//       ]);
//       setRoom(''); 
//     }
//   };

//   // const handleSearch = (e) => {
//   //   setSearchTerm(e.target.value);
//   // };

//   // const handleCreateGroup = () => {
//   //   if (newGroupName.trim()) {
//   //     setGroups((prevGroups) => [...prevGroups, { id: groups.length + 1, name: newGroupName }]);
//   //     setNewGroupName('');
//   //   }
//   // };

//   // const filteredGroups = groups.filter((group) =>
//   //   group.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div className="group-chat-container">
//       <Navbar />
      
//       <div className="chat-main">
//         {/* <div className="groups">
//           <input
//             type="text"
//             placeholder="Search groups..."
//             className="group-search-input"
//             value={searchTerm}
//             onChange={handleSearch}
//           />
          
//           <ul className="group-list">
//             {filteredGroups.map((group) => (
//               <li key={group.id} className="group-item">
//                 {group.name}
//               </li>
//             ))}
//           </ul>
          
//           <div className="create-group">
//             <input
//               type="text"
//               placeholder="New group name"
//               className="create-group-input"
//               value={newGroupName}
//               onChange={(e) => setNewGroupName(e.target.value)}
//             />
//             <button className="create-group-button" onClick={handleCreateGroup}>
//               Create Group
//             </button>
//           </div>
//         </div> */}

//         <div className="expense-section">
//           <div className="expense-header">
//             <h3>Expense Sheet</h3>
//             <button className="add-expense">Add Expense</button>
//           </div>
//           <div className="expense-total">
//             <p>Total Expenses</p>
//             <h2>$4,280.00</h2>
//           </div>
//           <div className="expense-item">
//             <span className="expense-icon">🏠</span>
//             <span>Accommodation</span>
//             <span className="expense-amount">$2,500</span>
//           </div>
//           <div className="expense-item">
//             <span className="expense-icon">✈️</span>
//             <span>Transportation</span>
//             <span className="expense-amount">$1,780</span>
//           </div>
//           <button className="view-all-expenses">View All Expenses</button>
//         </div>
//       </div>
//         {socketID}
//       <form className="chat-input" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Type your message..."
//           className="input-box"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//          <input
//           type="text"
//           placeholder="room ID"
//           className="input-box"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <button className="send-button" type="submit">
//           Send
//         </button>
//       </form>
//       {/* <Stack spacing={2}>
//         {messages.map((m, i) => (
//           <div key={i}>
//              ({m.room})
//             <strong>Message:</strong> {m.message}
//           </div>
//         ))}
//       </Stack> */}
//       <Stack spacing={2}>
//         {messages.map((m, i) => (
//           <div key={i}>
//             {m.message}
//           </div>
//         ))}
//       </Stack>
//     </div>
//   );
// }

// export default Groups;

import React, { useEffect, useState, useMemo } from 'react';
import { io } from 'socket.io-client';
import Navbar from "../Components/Navbar";
import MessageInput from "../Components/MessageInput"; 
import '../Pages/groups.css';

function Groups() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");

  const socket = useMemo(() => io("http://localhost:5000"), []);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id);
      console.log("Connected", socket.id);
    });

    socket.on("recive-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = { message: inputMessage, room };
      socket.emit("message", newMessage);
      setMessages((prevMessages) => [...prevMessages, { message: inputMessage, room: "You" }]);
      setInputMessage('');
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="content-container">
        {/* Left Sidebar */}
        <div className="groups-sidebar">
          <h2>Groups</h2>
          <div className="group-list">
            <div className="group-item">Group 1</div>
            <div className="group-item">Group 2</div>
            <div className="group-item">Group 3</div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="group-chat-container">
        <div className="display-message">
            {messages.map((m, i) => (
              <div key={i} className={`message-item ${m.room === "You" ? "you" : "other"}`}>
                {m.room !== "You" && <img src="/user-avatar.png" alt="User" className="avatar" />}
                <h3>{m.message}</h3>
                {m.room === "You" && <img src="/my-avatar.png" alt="You" className="avatar" />}
              </div>
            ))}
          </div>
          <div className="chat-main">
            <form className="chat-input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Type your message..."
                className="input-box"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <input
                type="text"
                placeholder="Room ID"
                className="input-box"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <MessageInput/>
              <button className="send-button" type="submit">Send</button>
            </form>
            
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="details-sidebar">
          <h2>Details</h2>
          <div className="details-content">
            <p>Room ID: {room}</p>
            <p>Socket ID: {socketID}</p>
          </div>
          <div className="expense-section">
            <h2>Expenses</h2>
            <div className="expense-total">Total Expenses: $4,280.00</div>
            <div className="expense-item">
              <span>Accommodation:</span>
              <span>$2,500</span>
            </div>
            <div className="expense-item">
              <span>Transportation:</span>
              <span>$1,780</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
