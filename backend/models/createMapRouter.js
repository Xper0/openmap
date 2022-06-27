import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongooseAutoPopulate from "mongoose-autopopulate";

const mapRouteSchema = new Schema({
  titleRoute: {
    type: String
  },
  coordinates: {
    type: Array
  },
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipments",
    autopopulate: true
  }
})

mapRouteSchema.plugin(mongooseAutoPopulate)

const mapRoutes = mongoose.model("mapRoutes", mapRouteSchema);


export default  mapRoutes;