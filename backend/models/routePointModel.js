import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;

/**
 * Схема для точек маршрута
 *
 * @var spot объект спота {Spot}
 * @var spotEvent объект события спота {SpotEvent}
 * @var acecpted Пройдена ли точка маршрута {Boolean}
 */
const routePointSchema = new Schema({
  spot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "spot",
    autopopulate: true,
  },
  spotEvents: [
    {
      acecpted: { type: Boolean, default: false },
      spotEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "spotEvent",
        autopopulate: true,
      },
    },
  ],
});

routePointSchema.plugin(mongooseAutoPopulate);
const routePoint = mongoose.model("routePoints", routePointSchema);
export default routePoint;
