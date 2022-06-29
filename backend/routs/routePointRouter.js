import express from "express";
import RoutePointController from "../controller/routePointController.js";

const routePointRouter = express.Router();

routePointRouter
  .route("/routePoint")
  .get(RoutePointController.findRoutePointById)
  .put(RoutePointController.updateRoutePoint);

routePointRouter.put(
  "/aceptRoutePointEvent",
  RoutePointController.aceptRoutePointEvent
);

routePointRouter.get("/reset", RoutePointController.resetPoint);

export default routePointRouter;
