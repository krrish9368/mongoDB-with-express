const mongoose = require('mongoose');


let chatSchema= new mongoose.Schema({
    send:{
       type:String,
       required:true,
      
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
    }
});

const Chat =mongoose.model("Chat",chatSchema);


module.exports= Chat;