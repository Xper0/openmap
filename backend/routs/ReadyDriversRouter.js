import express from "express";
import {findReadyDrivers, createReadyDrivers, updateReadyDrivers, deleteReadyDrivers} from "../controller/ReadyDriversController.js";
const ReadyDriverRouter = express.Router();

ReadyDriverRouter.get("/readydriver", findReadyDrivers)
    .post("/readydriver", createReadyDrivers)
    .put("/readydriver", updateReadyDrivers)
    .delete("/readydriver", deleteReadyDrivers)



export default ReadyDriverRouter;
