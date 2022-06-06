import mongoose from "mongoose";
import shipment from "../testData/shipment.js";
const Schema = mongoose.Schema;


const shipmentSchema = new Schema({
    shipment: [{
          type: Object
        }]

})



const Shipment = mongoose.model("Shipments", shipmentSchema);
// Shipment.create(shipment)


export default  Shipment;