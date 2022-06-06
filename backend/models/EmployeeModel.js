import mongoose from "mongoose";
import employee from "../testData/employee.js";
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
    firstName: {
        type: String
    },
    secondName: {
        type: String
    },
    middleName: {
        type: String
    },
    job_position: {
        type: String
    }

})


const Employees = mongoose.model("Employees", employeeSchema);
// Employees.create(employee)


export default  Employees;