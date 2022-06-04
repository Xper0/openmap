import express from "express";
import {findFlightRouter, createFlightRouter, updateFlightRouter, deleteFlightRouter} from "../controller/FlightController.js";
const FlightRouter = express.Router();

FlightRouter.get("/flightRouter", findFlightRouter)
            .post("/flightRouter", createFlightRouter)
            .put("/flightRouter", updateFlightRouter)
            .delete("/flightRouter", deleteFlightRouter)



export default FlightRouter;
