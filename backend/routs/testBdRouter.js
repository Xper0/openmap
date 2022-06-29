import express from "express";
import {createBDRouter} from "../controller/testBdController.js";
const testBdRouter = express.Router();

testBdRouter.route("/testBD")
    .post(createBDRouter);




export default testBdRouter;
