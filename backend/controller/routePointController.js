import RoutePointServices from "../services/routePointServices.js";

/**
 * Класс контреоллер для обработки запросов связаных с RoutePoint (точка маршрута)
 * взаимодействие с бд происходит через RoutePointServices
 *
 * @class SpotController
 */
class RoutePointController {
  /**
   * Поиск точки маршрута по id
   * Точка маршрута ищеться по id полученого из Query string
   *
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async findRoutePointById(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const routePoint = await RoutePointServices.findRoutePointById(id);
        return res.status(200).json({
          routePoint,
        });
      }
      return res.status(400).json({
        message: "Поле id не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  /**
   * Обнавление точки маршрута
   * Точка маршрута изменяется по
   *
   * id полученного из тела запроса
   *
   * updates объект с полями которые нужно изменить в точке маршрута берётся из тела запроса
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async updateRoutePoint(req, res) {
    try {
      const { id, updates } = req.body;
      if (id) {
        const routePoint = await RoutePointServices.updateRoutePoint(
          id,
          updates
        );
        return res.status(200).json({
          routePoint,
        });
      }
      return res.status(400).json({
        message: "Поле id не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  async aceptRoutePointEvent(req, res) {
    try {
      const { id, index } = req.body;
      if (id) {
        const routePoint = await RoutePointServices.aceptRoutePointEvent(
          id,
          index
        );
        return res.status(200).json({
          routePoint,
        });
      }
      return res.status(400).json({
        message: "Поле id не заполненно",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
  rp = [
    "62bac29f6ca665acbea4ec91",
    "62bac29f6ca665acbea4ec93",
    "62bac29f6ca665acbea4ec95",
    "62bac29f6ca665acbea4ec97",
    "62bac29f6ca665acbea4ec99",
    "62bac29f6ca665acbea4ec9b",
    "62bac29f6ca665acbea4ec9d",
  ];
  resetPoint = async (req, res) => {
    for (const p of this.rp) {
      await RoutePointServices.updateRoutePoint(p, {
        acecpted: false,
      });
    }
    return res.status(200).json({
      message: "resetPoint",
    });
  };
}
export default new RoutePointController();
