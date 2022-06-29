import express from "express";
import SpotController from "../controller/spotController.js";

const SpotRouter = express.Router();

SpotRouter.route("/spots").get(SpotController.findAllSpot);

SpotRouter.route("/spot")
  .get(SpotController.findSpotById)
  .post(SpotController.createSpot);

export default SpotRouter;
