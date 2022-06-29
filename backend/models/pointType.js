import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * Схема для типа для точки события на карте
 * 
 * @var serviceName служебное навзание {String}
 * @var name название типа точки {String}
 */
const pointTypeSchema = new Schema({
  serviceName: { type: String },
  name: { type: String },
});

const PointType = mongoose.model("pointtype", pointTypeSchema);
export default PointType;
