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
const garageSchema = new Schema({
    name: { type: String },
});

garageSchema.plugin(mongooseAutoPopulate);

const Garage = mongoose.model("Garage", garageSchema);
export default Garage;
