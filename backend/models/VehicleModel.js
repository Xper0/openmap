import mongoose from "mongoose";
import vehicle from "../testData/vehicle.js";
const Schema = mongoose.Schema;


const vehicleRouteSchema = new Schema({
    license_number: {
        type: String
    },
    type_vehicle: {
        type: String
    },
    wear_vehicle: {
        type: Number
    }

})


const VehicleRoute = mongoose.model("Vehicles", vehicleRouteSchema);
// VehicleRoute.create(vehicle)

export default  VehicleRoute;