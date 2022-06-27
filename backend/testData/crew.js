import EmployeeModel from "../models/EmployeeModel.js";
import vehicleModel from "../models/VehicleModel.js";


// let drivers = EmployeeModel.find({})
// drivers.then(res => res.map(key => crew.drivers = key._doc._id))
// let vehicle = vehicleModel.find({})
// vehicle.then(res => crew.vehicle = res.find(item => item._doc._id))

const crew = [
    {
        drivers: ["629da794a5169090da42c054"],
        vehicle: "62b9b66a0ea8eb37a7fbf0c0"
    },
    {
        drivers: ["629da794a5169090da42c055"],
        vehicle: "62b9b66a0ea8eb37a7fbf0c1"
    },
    {
        drivers: ["6298bb4facbebf866d36c6f8"],
        vehicle: "62b9b66a0ea8eb37a7fbf0bf"
    }
];


export default  crew;