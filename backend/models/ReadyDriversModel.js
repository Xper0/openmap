import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;


const readyDriversSchema = new Schema({
    drivers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crew",
        autopopulate: true
    }]
})

readyDriversSchema.plugin(mongooseAutoPopulate)

const ReadyDrivers = mongoose.model("ReadyDrivers", readyDriversSchema);


export default  ReadyDrivers;