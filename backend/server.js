const express = require('express')
const chats = require('../backend/data/data')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const connectDB = require('./config/connect')
const userRoutes = require('./routes/userRoutes')
const chatsRoute = require('./routes/chatsRoute')
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors')

dotenv.config()
app.use(express.json());
const port = process.env.PORT || 6000


app.use('/api/chat' ,chatsRoute)
app.use('/api/user',userRoutes)
app.use('/api/message' , messageRoutes);

app.use((req , res)=>{
    res.status(404).send('<h1> Page not found <h1>')
})

const server = app.listen(port,async ()=> {
    await connectDB()
    console.log("Server started " + port)
})

const io = require('socket.io') (server , {
    pintTimeout : 60000 ,
    cors : {
        origin :  "https://localhost:3000"
    }
})

io.on("connection" , (socket)=>{
    console.log("Connected to socket.io")
})