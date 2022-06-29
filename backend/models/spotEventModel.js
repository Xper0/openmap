import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Схема для событий спотов
 * 
 * @var spotEventSchema Сервисное название события {String}
 * @var name Название события спота {String}
 * @var description Описание событие спота {String}
 */
const spotEventSchema = new Schema({
  serviceName: { type: String },
  name: { type: String },
  description: { type: String },
});

const spotEvent = mongoose.model("spotEvent", spotEventSchema);
export default spotEvent;
