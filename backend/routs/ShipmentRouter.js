import express from "express";
import {findShipment, createShipment, updateShipment, deleteShipment} from "../controller/ShipmentConroller.js";
const ShipmentRouter = express.Router();

ShipmentRouter.get("/shipment", findShipment)
    .post("/shipment", createShipment)
    .put("/shipment", updateShipment)
    .delete("/shipment", deleteShipment)



export default ShipmentRouter;
