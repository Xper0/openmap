import SpotServices from "../services/spotServices.js";

/**
 * Класс контреоллер для обработки запросов связаных с Spot (спота)
 * взаимодействие с бд происходит через SpotServices
 *
 * @class SpotController
 */
class SpotController {
  /**
   * Создание события спота
   * Точка создаётся из:
   *
   *  coordinate - массив координат [Number, Number] полученый из тела запроса
   *
   *  name - имя полученое из тела запроса;
   *
   *  description - описание полученое из тела запроса;
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async createSpot(req, res) {
    try {
      const { coordinate, name, description } = req.body;
      if (name || coordinate || description) {
        const spot = await SpotServices.createSpot(
          coordinate,
          name,
          description
        );
        return res.status(200).json({
          message: "Спот добавлен",
        });
      }
      return res.status(400).json({
        message: "Заполены не все обязательные поля",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }

  /**
   * Поиск спота по id
   * Событие ищеться по id полученого из Query string
   *
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async findSpotById(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const spot = await SpotServices.findSpotById(id);
        return res.status(200).json({
          spot,
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
   * Получение всех событий спота
   *
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async findAllSpot(req, res) {
    try {
      const spots = await SpotServices.findAllSpot();
      return res.status(200).json({
        spots,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
}
export default new SpotController();
