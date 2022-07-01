import express from "express";
import {findAllGarage, createGarage, updateGarage, deleteGarage} from "../controller/garageController.js";
const garageRouter = express.Router();

garageRouter.route("/garage")
    .get( findAllGarage)
    .post(createGarage)
    .put(updateGarage)
    .delete(deleteGarage)



export default garageRouter;