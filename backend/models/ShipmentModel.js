import mongoose from "mongoose";
const Schema = mongoose.Schema;


const shipmentSchema = new Schema({
    shipment: [{
          type: Object
        }]

})



const Shipment = mongoose.model("Shipments", shipmentSchema);


export default  Shipment;