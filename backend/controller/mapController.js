import mapRoutes from "../models/createMapRouter.js";
import RoutePointServices from "../services/routePointServices.js";
import SpotEventServices from "../services/spotEventServices.js";
import SpotServices from "../services/spotServices.js";

const getRoutes = async (req, res) => {
  try {
    // let geoJSON = await mapOsm.find({})
    const routes = await mapRoutes.find({});
    res.json({
      status: "ok",
      result: routes,
    });
  } catch (e) {
    res.json({
      status: "ok",
      msg: "Маршрут не найден",
    });
  }
};

const createRoute = async (req, res) => {
  try {

    // const route  = JSON.parse(req.body);
    const { route } = JSON.parse(req.body);
    await mapRoutes.create(route);
    res.json({
      status: "ok",
      msg: "Маршрут добавлен",
    });
  } catch (err) {
    res.json({
      status: "ok",
      msg: "Ошибка маршрута",
    });
  }
};

/**
 * Создание маршрута с точками
 * Маршрута создаётся из:
 *
 * route - маршрут объект с координатами маршрута и названием маршрута полученый из тела запроса
 *
 * points - масив объектов содержащих id спота и id события спота
 *
 * @param {Request} req - запрос пришедший на сервер
 * @param {Response} res - ответ сервера
 * @return {Response} ответ сервера
 * @memberof SpotEventController
 */
const createRouteWithPoints = async (req, res) => {
  try {
    const { route, points, weight } = req.body;

    const createdPoints = await Promise.all(
      points.map(async point => {
        const spot = await SpotServices.findSpotById(point.spotId);
        const spotEvents = await Promise.all(
          await point.spotEvents.map(async event => {
            const spotEvent = await SpotEventServices.findSpotEventById(
              event.spotEventId
            );
            return spotEvent;
          })
        );

        const routePoint = await RoutePointServices.createRoutePoint(
          spot,
          spotEvents
        );
        return routePoint;
      })
    );
    await mapRoutes.create({
      ...route,
      routePoints: [...createdPoints],
      weight,
    });
    res.json({
      status: "ok",
      msg: "Маршрут добавлен",
    });
  } catch (err) {
    res.json({
      status: "ok",
      msg: "Ошибка маршрута",
    });
  }
};

const findRouteById = async (req, res) => {
  try {
    // let geoJSON = await mapOsm.find({})
    let { id } = req.query;
    const route = await mapRoutes.findById(id);
    const routeJSON = JSON.parse(JSON.stringify(route));
    routeJSON.routePoints = await Promise.all(
      await routeJSON.routePoints.map(async point => {
        const spotEvents = await Promise.all(
          point.spotEvents.map(async event => {
            const ev = await SpotEventServices.findSpotEventById(event._id);
            return {
              acecpted: event.acecpted,
              ...JSON.parse(JSON.stringify(ev)),
            };
          })
        );
        return { ...point, spotEvents };
      })
    );
    res.json({
      status: "ok",
      result: routeJSON,
    });
  } catch (e) {
    res.json({
      status: "ok",
      msg: "Маршрут не найден",
    });
  }
};

export { getRoutes, createRoute, createRouteWithPoints, findRouteById };
