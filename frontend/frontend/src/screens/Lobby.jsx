// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketProvider";

// const LobbyScreen = () => {
//   const [email, setEmail] = useState("");
//   const [room, setRoom] = useState("");

//   const socket = useSocket();
//   const navigate = useNavigate();

//   const handleSubmitForm = useCallback(
//     (e) => {
//       e.preventDefault();
//       socket.emit("room:join", { email, room });
//     },
//     [email, room, socket]
//   );

//   const handleJoinRoom = useCallback(
//     (data) => {
//       const { email, room } = data;
//       navigate(`/room/${room}`);
//     },
//     [navigate]
//   );

//   useEffect(() => {
//     socket.on("room:join", handleJoinRoom);
//     return () => {
//       socket.off("room:join", handleJoinRoom);
//     };
//   }, [socket, handleJoinRoom]);

//   return (
//     <div>
//       <h1>Lobby</h1>
//       <form onSubmit={handleSubmitForm}>
//         <label htmlFor="email">Email ID</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <br />
//         <label htmlFor="room">Room Number</label>
//         <input
//           type="text"
//           id="room"
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//         />
//         <br />
//         <button>Join</button>
//       </form>
//     </div>
//   );
// };

// export default LobbyScreen;
// import React, { useState, useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSocket } from "../context/SocketProvider";
// import { FiVideo, FiMic } from 'react-icons/fi';

// const LobbyScreen = () => {
//   const [roomId, setRoomId] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//     const socket = useSocket();
//    //const navigate = useNavigate();
//   const createRoom = useCallback(() => {
//     let roomid=Math.random().toString(36).substring(2, 13);  
//    // setRoomId(roomId)
//     console.log(roomid);
//     socket.emit('room:create',{roomid,email})
//     navigate(`/room/${roomid}`)
//   },[roomId])
    

//   const joinRoom = useCallback(() => {
//     socket.emit('room:join',{roomId,email})
//     //socket.on('room:joinSucess')
//     //const regexPattern = /^[a-z0-9]{11}$/;
//     navigate(`/room/${roomId}`)
//   },[roomId])

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-4xl font-bold mb-4">Video Conference Rooms</h1>
//       <div className="flex space-x-4 mb-6">
//         <button onClick={createRoom} className="bg-green-500 text-white py-2 px-4 rounded-lg">
//           Create Room
//         </button>
//         <input
//           type="text"
//           placeholder="Enter Room ID"
//           value={roomId}
//           onChange={(e) => setRoomId(e.target.value)}
//           className="border rounded-lg px-3 py-2 focus:outline-none"
//         />
//          <input
//           type="email"
//            id="email"
//            value={email}
//            onChange={(e) => setEmail(e.target.value)}
//         />        
//         <button onClick={joinRoom} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
//           Join Room
//         </button>
//       </div>
//       <p className="text-gray-600 text-sm">
//         Create a new room to start a video conference or enter a room code to join an existing one.
//       </p>
//       <div className="flex space-x-4 mt-8">
//         <div className="bg-gray-200 p-4 rounded-lg flex items-center">
//           <FiVideo className="text-green-500 mr-2" />
//           <span className="font-semibold">HD Video</span>
//         </div>
//         <div className="bg-gray-200 p-4 rounded-lg flex items-center">
//           <FiMic className="text-green-500 mr-2" />
//           <span className="font-semibold">Crystal Clear Audio</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LobbyScreen;
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import { FiVideo, FiMic } from 'react-icons/fi';

const LobbyScreen = () => {
  const [roomId, setRoomId] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const createRoom = useCallback(() => {
    const roomid = Math.random().toString(36).substring(2, 13);
    console.log(roomid);
    socket.emit('room:create', { roomid, email });
    navigate(`/room/${roomid}`);
  }, [email, navigate, socket]);

  const joinRoom = useCallback(() => {
    socket.emit('room:join', { roomId, email });
    navigate(`/room/${roomId}`);
  }, [email, navigate, roomId, socket]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Video Conference Rooms</h1>
      <div className="flex space-x-4 mb-6">
        <button onClick={createRoom} className="bg-green-500 text-white py-2 px-4 rounded-lg">
          Create Room
        </button>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none"
        />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none"
        />
        <button onClick={joinRoom} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Join Room
        </button>
      </div>
      <p className="text-gray-600 text-sm">
        Create a new room to start a video conference or enter a room code to join an existing one.
      </p>
      <div className="flex space-x-4 mt-8">
        <div className="bg-gray-200 p-4 rounded-lg flex items-center">
          <FiVideo className="text-green-500 mr-2" />
          <span className="font-semibold">HD Video</span>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center">
          <FiMic className="text-green-500 mr-2" />
          <span className="font-semibold">Crystal Clear Audio</span>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
