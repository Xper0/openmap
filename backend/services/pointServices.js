import PointType from "./../models/pointType.js";
import Point from "./../models/pointModel.js";

/**
 * Класс для взаимодействия стаблицей Point (точка) и PointType (тип точки)
 *
 * @class PointServices
 */
class PointServices {
  /**
   * Создание типа точки
   *
   * @param {String} serviceName служебное название
   * @param {String} name название
   * @return {PointTypr} тип точки
   * @memberof PointServices
   */
  async createPointType(serviceName, name) {
    return await PointType.create({ serviceName, name });
  }

  /**
   * Поиск типа точки по id
   *
   * @param {String} id id типа точки
   * @return {PointType} тип точки
   * @memberof PointServices
   */
  async findPointTypeById(id) {
    return await PointType.findById(id);
  }

  /**
   * Получение всех типов точки
   *
   * @return {PointType} получение типа точки
   * @memberof PointServices
   */
  async findAllPointTypes() {
    return await PointType.find();
  }

  /**
   * Создание точки
   *
   * @param {String} coordinate массива координат [долгота(longitude){Number}, широта(latitude){Number}]
   * @param {String} name название
   * @param {String} description описание
   * @param {String} typeId айли типа точки
   * @return {PointType} точка при успехе или объект со статусом и сообзение ошибки
   * @memberof PointServices
   */
  async createPoint(coordinate, name, description, typeId) {
    const pointType = await this.findPointTypeById(typeId);

    if (pointType) {
      return await Point.create({
        coordinate,
        name,
        description,
        type: pointType,
      });
    }
    return { status: 404, message: "Тип точки не найдуен" };
  }

  /**
   * Поиск точки по id
   *
   * @param {String} id точки
   * @return {Point} точка
   * @memberof PointServices
   */
  async findPointById(id) {
    return await Point.findById(id);
  }

  /**
   * Получение всех точек
   *
   * @return {Point} точки
   * @memberof PointServices
   */
  async findAllPoints() {
    return await Point.find();
  }
}

export default new PointServices();
