import SpotEvent from "./../models/spotEventModel.js";

/**
 * Класс для взаимодействия с таблицей SpotEvent (событие спота)
 *
 * @class SpotEventServices
 */
class SpotEventServices {
  /**
   * Поиск события спота по id
   *
   * @param {String} id id события спота
   * @return {SpotEvent} событие спота
   * @memberof SpotEventServices
   */
  async findSpotEventById(id) {
    return await SpotEvent.findById(id);
  }

  /**
   * Получение всех событий для спота
   *
   * @return {SpotEvent} события спота
   * @memberof SpotEventServices
   */
  async findAllSpotEvent() {
    return await SpotEvent.find();
  }

  /**
   * Создание события для спота
   *
   * @param {String} serviceName служебное имя
   * @param {String} name назыание
   * @param {String} description описание
   * @return {SpotEvent} событие для спота
   * @memberof SpotEventServices
   */
  async createSpotEvent(serviceName, name, description) {
    return await SpotEvent.create({
      serviceName,
      name,
      description,
    });
  }
}

export default new SpotEventServices();
