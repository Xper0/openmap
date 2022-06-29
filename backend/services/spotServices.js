import Spot from "./../models/spotModel.js";

/**
 * Класс для взаимодействия с таблицей Spot (спот)
 *
 * @class SpotServices
 */
class SpotServices {
  /**
   * Поиск спота по id
   *
   * @param {String} id id спота
   * @return {Spot} спот
   * @memberof SpotServices
   */
  async findSpotById(id) {
    return await Spot.findById(id);
  }

  /**
   * Получение всех спотов
   *
   * @return {Spot} споты
   * @memberof SpotServices
   */
  async findAllSpot() {
    return await Spot.find();
  }

  /**
   * Создание спота
   *
   * @param {String} serviceName слуэебное название
   * @param {String} name назыание
   * @param {String} description описание
   * @return {Spot} - спот
   * @memberof SpotServices
   */
  async createSpot(serviceName, name, description) {
    return await Spot.create({
      serviceName,
      name,
      description,
    });
  }
}

export default new SpotServices();
