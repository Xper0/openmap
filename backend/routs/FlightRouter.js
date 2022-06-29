import express from "express";
import {findFlightRouter, createFlightRouter, updateFlightRouter, deleteFlightRouter} from "../controller/FlightController.js";
const FlightRouter = express.Router();

FlightRouter.route("/flightRouter")
    .get(findFlightRouter)
    .post(createFlightRouter)
    .put(updateFlightRouter)
    .delete(deleteFlightRouter)


FlightRouter.route("/flightRouter:id")
    .get(findFlightRouter)
    .post(createFlightRouter)
    .put(updateFlightRouter)
    .delete(deleteFlightRouter)


export default FlightRouter;
