const express = require("express");
const app = express();
const path =require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride = require("method-override")
main().then(()=>{
    console.log("connection chl gya hai");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/messenger');

}


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));


app.get("/",(req,res)=>{
    res.send("hamra root wala page hai ye")
})

//Index Route
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
   res.render("index.ejs",{chats})
});

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
  let {send,to,msg}=req.body;
  let newChat=new Chat({
    send:send,
    to:to,
    msg:msg,
    created_at:new Date(),
  })
  newChat.save()
  .then((res)=>{
    console.log("chat save ho gyi");
  }).catch((err)=>{
    consol.log(err)
  })
  res.redirect("/chats")
})

//edit route

app.get("/chats/:id/edit",async(req,res)=>{
    try{
    let id =req.params.id.replace(":","");
    let chat=await Chat.findById(id)
    if(!chat){
        return res.status(404).send("Chat not found")
    }
    res.render("edit.ejs",{chat});
}catch(error){
    console.log(error);
    res.status(500).send("Internal server error")
}
})

//Update route
app.put("/chats/:id",(req,res)=>{
    let id =req.params;
    let {msg:newMsg} = req.body;
    console.log(newMsg);
    let updateChat= Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runvalidators:true,new:true}
    );
    console.log(updateChat)
    res.redirect("/chats")
})


app.listen("8080",()=>{
    console.log("hamra port 8080 chl gya hai")
});