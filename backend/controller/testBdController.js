import EmployeeModel from "../models/EmployeeModel.js";
import employee from "../testData/employee.js";
import VehicleModel from "../models/VehicleModel.js";
import vehicle from "../testData/vehicle.js";
import ShipmentModel from "../models/ShipmentModel.js";
import shipment from "../testData/shipment.js";
import CrewModel from "../models/CrewModel.js";
import crew from "../testData/crew.js";
import FlightRouterModel from "../models/FlightRouterModel.js";
import flight from "../testData/flight.js";

const createBDRouter = () => {
    EmployeeModel.create(employee)
    VehicleModel.create(vehicle)
    ShipmentModel.create(shipment)
    CrewModel.create(crew)
    FlightRouterModel.create(flight)
}


export  {createBDRouter};