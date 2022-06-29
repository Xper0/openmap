import express from "express";
import Users from "../models/userList.js";
import {Auntification, authUser, LogOut, Registration} from "../controller/userController.js";

const userRouters = express.Router();


// const Registration = ( req, res ) => {
//
// }
//
// const Auntification = async ( req, res ) => {
//   const user = await Users.find({phone: req.body.phone})
//   if (user) {
//     res.json({
//       status: "ok",
//       result: user
//     })
//   }
// }
// userRouters.post("/session", Auntification)
userRouters.get("/login", authUser)
           .post("/registration", Registration)


export default userRouters;
