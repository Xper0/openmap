import express from "express";
import {findVehicle, createVehicle, updateVehicle, deleteVehicle} from "../controller/VehicleController.js";

const VehicleRouter = express.Router();

VehicleRouter.get("/vehicle", findVehicle)
    .post("/vehicle", createVehicle)
    .put("/vehicle", updateVehicle)
    .delete("/vehicle", deleteVehicle)



export default VehicleRouter;