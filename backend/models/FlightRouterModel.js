import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;


const flightRouteSchema = new Schema({
    router: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "mapRoutes",
        autopopulate: true
    },
    drivers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crews",
        autopopulate: true
    },
    date: {
        type: Date
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipments",
        autopopulate: true
    },
    acceptRoute: {
        type: Boolean,
        default: false
    },
    _delete: {
        type: Boolean,
        default: false
    }
})

flightRouteSchema.plugin(mongooseAutoPopulate)

const Flight = mongoose.model("Flights", flightRouteSchema);


export default  Flight;