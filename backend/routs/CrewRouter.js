import express from "express";
import {findCrew, createCrew, updateCrew, deleteCrew} from "../controller/CrewController.js";
const CrewRouter = express.Router();

CrewRouter.route("/crew/:id")
    .get( findCrew)
    .post( createCrew)
    .put( updateCrew)
    .delete(deleteCrew)



export default CrewRouter;