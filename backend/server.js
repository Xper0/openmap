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
import WebSocket, { WebSocketServer } from "ws";
import FlightRouterModel from "./models/FlightRouterModel.js";
import pointRouter from "./routs/pointRouter.js";
import spotRouter from "./routs/spotRouter.js";
import spotEventRouter from "./routs/spotEventRouter.js";
import routePointRouter from "./routs/routePointRouter.js";
import garageRouter from "./routs/garageRouter.js";
import  http  from "http";
import axios from "axios";
import cookieParser from "cookie-parser";
import {findCrew} from "./controller/CrewController.js";
import ReadyDrivers from "./models/ReadyDriversModel.js";


const db = `mongodb+srv://Xper:${process.env.PASSWORD_DB}@cluster0.0ac6y.mongodb.net/${process.env.BLOCK_DB}?retryWrites=true&w=majority`;
// const db = "mongodb://127.0.0.1:27017/maps";
const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 5000;


/**
 * Config server
 */

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: ["http://127.0.0.1:8080","http://localhost:8080/", "http://127.0.0.1:3000", "http://localhost:3000"],
}))
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:8080","http://localhost:8080/", "http://127.0.0.1:3000", "http://localhost:3000"],
//     methods: ["GET", "POST"]
//   })
// );
app.use(cookieParser())

/** Api
 * EmployeeRouter - Сотрудники
 * VehicleRouter - Транспортное средство
 * CrewRouter - Экипаж
 * FlightRouter - Рейс
 * ReadyDriverRouter - готовые водители
 * ShipmentRouter - груз
 */
app.use("/api", userRouters);
app.use("/api", mapRouter);
app.use("/api", EmployeeRouter);
app.use("/api", VehicleRouter);
app.use("/api", CrewRouter);
app.use("/api", FlightRouter);
app.use("/api", ReadyDriverRouter);
app.use("/api", ShipmentRouter);
app.use("/api", testBdRouter);
app.use("/api", pointRouter);
app.use("/api", spotRouter);
app.use("/api", spotEventRouter);
app.use("/api", routePointRouter);
app.use("/api", garageRouter);


httpServer.listen(port, () => {
  try {
    mongoose.connect(db, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`server  is started on port: ${port}`);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Socket
 */

export const wss = new WebSocketServer({ server: httpServer });
// const wss = new WebSocketServer({ port })
// const wss = new WebSocketServer({ port: 7000})

wss.on("connection",  (ws) => {
  // setInterval(setMarkerMachine.bind(null, ws), 3000);
  ws.send(JSON.stringify('socket is online'))
  ws.on("message", async (body, isBinary) => {
    body = JSON.parse(body)
    switch (body.method) {
      case "addFlightRoute":
        connectionHandler(ws, body)
        break
      case "markerTimer":
        // sendNewCoords(body, ws)
        break
      case "createCrew":
        await sendCrewData(ws, body)
            break;
      case "alarmMessage":
        wss.clients.forEach( client => {
          client.send(JSON.stringify({
           ...body
          }))
        })
        break
      case "waitingLine":
         checkWaitingLine(ws, body)
        break
      default:
        break
    }


    // const driverId = JSON.parse(body)
    // const id = driverId[0].drivers._id
    // const flightRoute = await FlightRouterModel.findOne({drivers: id})
    // if (flightRoute) {
    //     broadcastMessages(ws,flightRoute._doc, isBinary)
    // }
  });
})
async function sendCrewData(ws,body) {
  try {
    let data = await axios.get(`https://apiopenmap.herokuapp.com/api/crew?id=${body.driverId}`);
    // let crewData = findCrew(body.driverId);
    console.log(data)
    ws.id = body.driverId
    if (data){
      ws.send(JSON.stringify({
        result: data
      }))
    }else{
      ws.send(JSON.stringify({
        result: "Экипаж не найден"
      }))
    }
  }catch (err){
    console.log(err)
  }


}

function connectionHandler(ws,msg) {
  // msg = JSON.parse(msg)
  ws.id = msg.driverId
  // ws.id = msg[0].drivers._id
  broadcastMessages(ws, msg)
  checkWaitingLine(ws,msg)
}
async function checkWaitingLine(ws, body) {
  // let waitingLineList = await ReadyDrivers.find({});
  let {data} = await axios("http://127.0.0.1:5000/api/readydriver");
  // let {data} = await axios("https://apiopenmap.herokuapp.com/api/readydriver");
  let findIndex = data.message.findIndex( index => index.length !==0 ? index.drivers[0].drivers[0]._id === body.profileId : -1);
  // let findIndex = data.message.findIndex( index => index.drivers[0].drivers._id === body.profileId);
  // let findIndex = data.message.findIndex( index => index._id === body.profileId);
  console.log(findIndex)
  if (findIndex !== -1) {
    ws.send(JSON.stringify({
      method: "waitingLine",
      message: findIndex + 1,
      // message: `Вы ${findIndex + 1} в очереди`
    }))
  }else{
    ws.send(JSON.stringify({
      method: "waitingLine",
      message: "Не найден"
      // message: `Вы ${findIndex + 1} в очереди`
    }))
  }

}

// function sendNewCoords(flightRoute) {
//   console.log(Object.values(flightRoute.flightRoute))
//   flightRoute.flightRoute.forEach( item =>
//       item.router.coordinates.map( coord => sendTimer(coord))
//   )
// }
// function sendTimer(coord) {
//   wss.clients.forEach( async (client) => {
//     let timerRef = setTimeout(() => client.send(JSON.stringify(coord)),5000)
//       return () => clearInterval(timerRef)
//   })
// }

function sendNewCoords(flightRoute, ws) {
  // flightRoute.flightRoute.forEach( item => ArrayPlusDelay(item, 5000))
  console.log(flightRoute)

  let timeRef =  setInterval(setMarkerMachine.bind(null,flightRoute, ws), 5000);
  // return () => clearInterval(timeRef)

}
let counter = 0
async function setMarkerMachine(ws) {
  let data = await axios.get("https://apiopenmap.herokuapp.com/api/flightRouter");
  let arr = []
     data.data.message
         .filter(item => counter < item.router.coordinates.length)
         .forEach(item => {
         counter++
       arr.push(item.router.coordinates[counter])
      })
    ws.send(JSON.stringify({
      method: "markerTimer",
      coordinate: arr,
    }))
}

function ArrayPlusDelay(array) {
  let i = 0;
  wss.clients.forEach(  (client) => {
    // each loop, call passed in function
    // stagger the timeout for each loop by the index
    for (i; i < array.length; i++ ) {
      client.send(JSON.stringify({
        method: "markerTimer",
        coordinate: array[i]
      }))
    }

  })

  // wss.clients.forEach( async (client) => {
  //   array.forEach(function (el, i) {
  //     let timerRef = setTimeout(function() {
  //       wss.clients.forEach(  (client) => {
  //         // each loop, call passed in function
  //         client.send(JSON.stringify(
  //             {
  //               method: "markerTimer",
  //               coordinate: array[i]
  //             }))
  //         // stagger the timeout for each loop by the index
  //       })
  //     }, delay * i);
  //     return () => clearTimeout(timerRef)
  //   })
  // })

  // array.router.coordinates.forEach(function (el, i) {
  //   setTimeout(function() {
  //     // each loop, call passed in function
  //
  //     // stagger the timeout for each loop by the index
  //   }, i * delay);
  // })
}





export default function broadcastMessages (ws,msg) {
  wss.clients.forEach(async (client) => {
    if (client.readyState === WebSocket.OPEN) {
      // if(client.id === msg[0].drivers._id) {
      if(client.id === msg.driverId) {
        // if (msg.hasOwnProperty("body")){
        //   console.log("body")
        //   client.send(JSON.stringify(msg));
        // }
          client.send(JSON.stringify("Маршрут еще не назначен"))
      }
      // if(client.id === msg.driverId) {
      //   // const id = msg[0].drivers._id
      //   const id = msg.driverId
      //   const flightRoute = await FlightRouterModel.findOne({drivers: id})
      //   if (flightRoute) {
      //     client.send(JSON.stringify(flightRoute._doc));
      //   } else {
      //     client.send(JSON.stringify("Маршрут еще не назначен"))
      //   }
      // }
      // }
    }
  });
}
