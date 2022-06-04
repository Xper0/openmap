import mongoose from "mongoose";
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


export default  VehicleRoute;