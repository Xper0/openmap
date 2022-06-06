import express from "express";
import {findEmployee, createEmployee, updateEmployee, deleteEmployee} from "../controller/EmployeeController.js";
const EmployeeRouter = express.Router();

EmployeeRouter.route("/employee")
    .get( findEmployee)
    .post(createEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)



export default EmployeeRouter;