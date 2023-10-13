const mongoose=require('mongoose')
const Room=new mongoose.Schema({
    roomId:{type:String},
    socketid:[{type:String}],
    maxmembers:{type:Number,default:2}
});

module.exports=mongoose.model("Room",Room,"Room");