import express from "express";
import SpotEventController from "../controller/spotEventController.js";

const SpotRouter = express.Router();

SpotRouter.route("/spotEvents").get(SpotEventController.findAllSpotEvent);

SpotRouter.route("/spotEvent")
  .get(SpotEventController.findSpotEventById)
  .post(SpotEventController.createSpotEvent);

export default SpotRouter;
