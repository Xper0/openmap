import SpotEventServices from "../services/spotEventServices.js";

/**
 * Класс контреоллер для обработки запросов связаных с SpotEvent (событий спота)
 * взаимодействие с бд происходит через SpotEventServices
 *
 * @class SpotEventController
 */
class SpotEventController {
  /**
   * Создание события спота
   * Cобытия создаётся из:
   *
   * serviceName - служебное имя полученое из тела запроса
   *
   * name - имя полученое из тела запроса;
   *
   * description - описание полученое из тела запроса;
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async createSpotEvent(req, res) {
    try {
      const { serviceName, name, description } = req.body;
      if (name || serviceName || description) {
        const spotEvent = await SpotEventServices.createSpotEvent(
          serviceName,
          name,
          description
        );
        return res.status(200).json({
          message: "Событие спота добавлено",
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
   * Поиск события спота по id
   * Событие ищеться по id полученого из Query string
   *
   *
   * @param {Request} req - запрос пришедший на сервер
   * @param {Response} res - ответ сервера
   * @return {Response} ответ сервера
   * @memberof SpotEventController
   */
  async findSpotEventById(req, res) {
    try {
      const { id } = req.query;
      if (id) {
        const spotEvent = await SpotEventServices.findSpotEventById(id);
        return res.status(200).json({
          spotEvent,
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
  async findAllSpotEvent(req, res) {
    try {
      const spotEvents = await SpotEventServices.findAllSpotEvent();
      return res.status(200).json({
        spotEvents,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        message: e,
      });
    }
  }
}
export default new SpotEventController();
