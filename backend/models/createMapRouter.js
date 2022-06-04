import mongoose from "mongoose";
const Schema = mongoose.Schema;


const mapRouteSchema = new Schema({
  titleRoute: {
    type: String
  },
  coordinates: {
    type: Array
  }
})


const mapRoutes = mongoose.model("mapRoutes", mapRouteSchema);


export default  mapRoutes;