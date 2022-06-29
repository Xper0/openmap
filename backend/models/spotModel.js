import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Схема для спотов(ключивых мест)
 *
 * @var coordinate массива координат [долгота(longitude){Number}, широта(latitude){Number}]
 * @var name Название спота {String}
 * @var description Описание спота {String}
 */
const spotSchema = new Schema({
  coordinate: { type: Array },
  name: { type: String },
  description: { type: String },
});

const spot = mongoose.model("spot", spotSchema);
export default spot;
