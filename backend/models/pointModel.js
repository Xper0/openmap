import mongoose from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
const Schema = mongoose.Schema;

/**
 * Схема для точки на карте
 * 
 * @var coordinate массива координат [долгота(longitude){Number}, широта(latitude){Number}]
 * @var name название точки {String}
 * @var description описание точки {String}
 * @var type объект типа точки {pointtype}
 */
const pointSchema = new Schema({
  coordinate: { type: Array },
  name: { type: String },
  description: { type: String },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pointtype",
    autopopulate: true,
  },
});

pointSchema.plugin(mongooseAutoPopulate);

const Point = mongoose.model("point", pointSchema);
export default Point;
