import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const Schema = mongoose.Schema;

/**
 * Схема для маршрута
 *
 * @var titleRoute название маршрута {Spot}
 * @var coordinate массива координат [долгота(longitude){Number}, широта(latitude){Number}]
 * @var routePoints массив обектов точек маршрута {routePoints[]}
 * @var weight вес маршрута
 */

const mapRouteSchema = new Schema({
  titleRoute: {
    type: String,
  },
  // coordinates: {
  //   type: Array
  // },
  coordinates: [
      [
        {
          lat: {type: Number},
          lng: {type: Number}
        }
      ]
  ],
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shipments",
    autopopulate: true
  },
  routePoints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "routePoints",
      autopopulate: true,
    },
  ],
  weight: {
    type: Number,
  },
})

mapRouteSchema.plugin(mongooseAutoPopulate)


const mapRoutes = mongoose.model("mapRoutes", mapRouteSchema);

export default mapRoutes;
