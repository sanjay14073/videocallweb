const { Server } = require("socket.io");
const mongoose=require('mongoose');
const io = new Server(8000, {
  cors: true,
});
const Room=require("./models/Roomschema");
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

const url="mongodb://localhost:27017";
mongoose.connect(url).then(()=>{console.log("connected")}).catch((e)=>{console.log(e)});
io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:create", async(data) => {
    const { roomid,email } = data;
    console.log(roomid)
    
    
    let room= Room();
    room.roomId=roomid;
    room.socketid.push(socket.id)
    room.maxmembers=1;
    await room.save();
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(roomid).emit("user:joined", { roomid, id:socket.id});
    socket.join(roomid);
    io.to(socket.id).emit("room:join", data);
  });
  socket.on("room:join", async(data) => {
    const { roomId,email } = data;
   // roomToSocketIdMap.set(roomId, socket.id);
    //let room=new Room({roomId,socketid});
    
    console.log(roomId);
    const regexPattern = /^[a-z0-9]{11}$/;
    //await room.save();
    
    if(roomId){
      console.log("entered here");
    //let room=await Room.findById(roomId);
    let room=await Room.find({roomId:roomId});
    console.log(room);
    if(room==null){
      io.to(socket.id).emit("join:failed");
    }
    else{
    console.log(room);
    if(room.length>0&&room[0].maxmembers>0){
      room[0].socketid.push(socket.id)
      room[0].maxmembers--;
      console.log(room[0])
      await room[0].save();
      emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(roomId).emit("user:joined", { roomId, id:socket.id});
    socket.join(roomId);
    io.to(socket.id).emit("room:join", data);
    }
    }
    
    }
    else{
      io.to(socket.id).emit("join:failed");
    }
  });
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

