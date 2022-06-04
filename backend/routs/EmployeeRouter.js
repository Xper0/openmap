import express from "express";
import {findEmployee, createEmployee, updateEmployee, deleteEmployee} from "../controller/EmployeeController.js";
const EmployeeRouter = express.Router();

EmployeeRouter.get("/employee", findEmployee)
    .post("/employee", createEmployee)
    .put("/employee", updateEmployee)
    .delete("/employee", deleteEmployee)



export default EmployeeRouter;