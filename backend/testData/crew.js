import EmployeeModel from "../models/EmployeeModel.js";
import vehicleModel from "../models/VehicleModel.js";


// let drivers = EmployeeModel.find({})
// drivers.then(res => res.map(key => crew.drivers = key._doc._id))
// let vehicle = vehicleModel.find({})
// vehicle.then(res => crew.vehicle = res.find(item => item._doc._id))

const crew = [
    {
        drivers: ["629da794a5169090da42c054"],
        vehicle: "6298b994d358fa65d318d009"
    },
    {
        drivers: ["629da794a5169090da42c055"],
        vehicle: "629da794a5169090da42c057"
    },
    {
        drivers: ["6298bb4facbebf866d36c6f8"],
        vehicle: "629da794a5169090da42c056"
    }
];


export default  crew;