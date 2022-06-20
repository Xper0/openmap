import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouters from "./routs/userRouters.js";
import mapRouter from "./routs/MapRouter.js";
import "dotenv/config";
import EmployeeRouter from "./routs/EmployeeRouter.js";
import VehicleRouter from "./routs/VehicleRouter.js";
import CrewRouter from "./routs/CrewRouter.js";
import FlightRouter from "./routs/FlightRouter.js";
import ReadyDriverRouter from "./routs/ReadyDriversRouter.js";
import ShipmentRouter from "./routs/ShipmentRouter.js";
import testBdRouter from "./routs/testBdRouter.js";
import WebSocket, { WebSocketServer } from 'ws';


const db = `mongodb+srv://Xper:${process.env.PASSWORD_DB}@cluster0.0ac6y.mongodb.net/${process.env.BLOCK_DB}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 5000;
const wss = new WebSocketServer({ port: 7000})


/**
 * soket
 */

wss.on("connection" ,  (ws) => {
    // ws.send('socket is online')
    ws.on("message", async (body) => {
        console.log("данные получены")
        return ws.send(JSON.stringify({
            type: "messages",
            status: "ok",
            msg: `Сообщение отправлено: ${body}`
        }))
    });
})

// app.use(express.text());
app.use(express.json())
app.use(
    cors({
        // origin: ["http://127.0.0.1:8080","http://localhost:8080/", "http://127.0.0.1:3000"],
        // methods: ["GET", "POST"]
    })
);


/** Api
 * EmployeeRouter - Сотрудники
 * VehicleRouter - Транспортное средство
 * CrewRouter - Экипаж
 * FlightRouter - Рейс
 * ReadyDriverRouter - готовые водители
 * ShipmentRouter - груз
 */
app.use("/api", userRouters)
app.use("/api", mapRouter)
app.use("/api", EmployeeRouter)
app.use("/api", VehicleRouter)
app.use("/api", CrewRouter)
app.use("/api", FlightRouter)
app.use("/api", ReadyDriverRouter)
app.use("/api", ShipmentRouter)
app.use("/api", testBdRouter)



        // ws.on("message", async (body) => {
        //     console.log(`this is message: ${body}`)
        //     let {message, idChat, id} = JSON.parse(body)
        //     if (message.length > 0 && idChat) {
        //         return ws.send(JSON.stringify({
        //             type: "messages",
        //             status: "ok",
        //             msg: `Сообщение отправлено: }`
        //         }))
        //     } else {
        //         return ws.send(JSON.stringify({
        //             type: "messages",
        //             responseId: id,
        //             status: "ok",
        //             msg: `Сообщение ne отправлено`
        //         }))
        //     }
        // })
        // client.addEventHandler((update) => {
        //   const message = update.message;
        //   console.log(update)
        //   if (update.className === "UpdateNewChannelMessage" || update.className === "UpdateNewMessage") {
        //     let fromID = message._chatPeer.channelId;
        //     let chatID = message.senderId;
        //     // console.log(fromID);
        //     // console.log(chatID);
        //     return ws.send(JSON.stringify({
        //       type: "newMessages",
        //       responseId: message.senderId,
        //       status: "ok",
        //       msg: {
        //         chatId: fromID,
        //         user: chatID,
        //         message: update.message
        //       }
        //     }));
        //   }
        // })


app.listen(port, () => {
    try {
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`server  is started on port: ${port}`)
    }catch (err){
        console.log(err)
    }

});