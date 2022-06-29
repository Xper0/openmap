import express from "express";
import PointController from "../controller/pointController.js";

const PointRouter = express.Router();

PointRouter.route("/pointType")
  .get(PointController.findAllPointTypes)
  .post(PointController.createPointType);

PointRouter.route("/point")
  .get(PointController.findAllPoints)
  .post(PointController.createPoint);

export default PointRouter;
