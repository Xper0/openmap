import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;


const crewRouteSchema = new Schema({
    drivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
        autopopulate: true
    }],
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicles",
        autopopulate: true
    }
})

crewRouteSchema.plugin(mongooseAutoPopulate)

const Crew = mongoose.model("Crew", crewRouteSchema);


export default  Crew;