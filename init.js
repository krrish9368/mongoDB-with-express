const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
main().then(()=>{
    console.log("connection chl gya hai");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/messenger');

}

let AllChat=[
    {
    send:"neha",
       to:"aanchal",
       msg:"mujhe apne notes send kr do",
       created_at:new Date(), 
    },
    {
        send:"aanchal",
        to:"divyanshi",
        msg:"please call me",
        created_at:new Date(),    
    },
    {
        send:"krrish",
        to:"naina",
        msg:"mai tujse nafrat krta hu",
        created_at:new Date() 
    },
    {
        send:"priya",
        to:"rohan",
        msg:"kl college aaogi kya",
        created_at:new Date()   
    }
]

Chat.insertMany(AllChat);