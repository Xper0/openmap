import mongoose from "mongoose";
import vehicle from "../testData/vehicle.js";
const Schema = mongoose.Schema;
import mongooseAutoPopulate from "mongoose-autopopulate";

const vehicleRouteSchema = new Schema({
    license_number: {
        type: String
    },
    type_vehicle: {
        type: String
    },
    wear_vehicle: {
        type: Number
    },
    max_shipment: {
        type: Number
    },
    garage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Garage",
        autopopulate: true
    },
    busy: {
        type: Boolean,
        default: false
    }

})

vehicleRouteSchema.plugin(mongooseAutoPopulate)

const VehicleRoute = mongoose.model("Vehicles", vehicleRouteSchema);
// VehicleRoute.create(vehicle)

export default  VehicleRoute;