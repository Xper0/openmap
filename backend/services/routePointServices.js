import RoutePoint from "./../models/routePointModel.js";

/**
 * Класс для взаимодействия стаблицей RoutePoint (точка маршрута)
 *
 * @class RoutePointServices
 */
class RoutePointServices {
  /**
   * Поиска точки маршрута по id
   *
   * @param {String} id id точки маршрута
   * @return {RoutePoint} токчка маршрута
   * @memberof RoutePointServices
   */
  async findRoutePointById(id) {
    return await RoutePoint.findById(id);
  }
  /**
   * Создане точки маршрута
   *
   * @param {Spot} spot объект спота
   * @param {SpotEvent} spotEvent объект события спота
   * @return {RoutePoint} точка маршрута
   * @memberof RoutePointServices
   */
  async createRoutePoint(spot, spotEvents) {
    return await RoutePoint.create({
      spot,
      spotEvents,
    });
  }

  /**
   *
   *
   * @param {String} id id точки маршрута
   * @param {Object} updates объект с полями который нужно изменить в точке маршрута
   * @return {RoutePoint} изменённая точка маршрута
   * @memberof RoutePointServices
   */
  async updateRoutePoint(id, updates) {
    return await RoutePoint.findByIdAndUpdate(id, updates, { new: true });
  }

  /**
   *
   *
   * @param {String} id id точки маршрута
   * @param {Number} index события из массива spotEvents
   * @return {RoutePoint} изменённая точка маршрута
   * @memberof RoutePointServices
   */
  async aceptRoutePointEvent(id, index) {
    const routePoint = await RoutePoint.findById(id);
    routePoint.spotEvents[index].acecpted = true;
    return await routePoint.save();
  }
}

export default new RoutePointServices();
