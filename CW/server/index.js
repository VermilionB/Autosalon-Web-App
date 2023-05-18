import express from 'express'
import dotenv from 'dotenv'
import router from "./src/routes/index.js";
import cors from 'cors'
import path from 'path'
import errorHandler from './src/middleware/errorHandlingMiddleware.js'
import {Server} from "socket.io";
import * as http from "http";

dotenv.config()

const __dirname = path.resolve();

const PORT = process.env.PORT

const app = express()
const wss = http.createServer(app);
app.use(cors());

app.use(express.json())
app.use(express.static(path.resolve(__dirname,'./server/src', 'static')))

app.use('/api', router)
const io = new Server(wss, {
    cors:{
        origin: '*',
        methods:["GET", "POST"],
    },
})
io.on("connection", (socket)=>{
    socket.on("sendmessage", data =>{
        io.emit("sendmessage", {
            message:data.message,
            user: data.user
        })
    })
})

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
wss.listen(5001, ()=>{
    console.log("WSServer is running on port 5001");
})

