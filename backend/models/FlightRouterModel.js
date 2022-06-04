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
        ref: "Crew",
        autopopulate: true
    },
    date: {
        type: Date
    },
    shipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shipments",
        autopopulate: true
    }
})

flightRouteSchema.plugin(mongooseAutoPopulate)

const Flight = mongoose.model("Flight", flightRouteSchema);


export default  Flight;