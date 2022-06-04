import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouters from "./routs/userRouters.js";
import mapRouter from "./routs/MapRouter.js";
import "dotenv/config";
import EmployeeRouter from "./routs/EmployeeRouter.js";
import VehicleRouter from "./routs/VehicleRouter.js";
import flightRouter from "./routs/FlightRouter.js";
import CrewRouter from "./routs/CrewRouter.js";
import FlightRouter from "./routs/FlightRouter.js";
import ReadyDriverRouter from "./routs/ReadyDriversRouter.js";
import ShipmentRouter from "./routs/ShipmentRouter.js";



const db = `mongodb+srv://Xper:${process.env.PASSWORD_DB}@cluster0.0ac6y.mongodb.net/${process.env.BLOCK_DB}?retryWrites=true&w=majority`;

const app = express();
const port = process.env.PORT || 5000;


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
app.use(userRouters)
app.use(mapRouter)
app.use(EmployeeRouter)
app.use(VehicleRouter)
app.use("/api", CrewRouter)
app.use(FlightRouter)
app.use(ReadyDriverRouter)
app.use(ShipmentRouter)


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