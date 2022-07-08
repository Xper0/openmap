import FlightService from "../services/FlightRouterService.js";
import spotEventServices from "../services/spotEventServices.js";

const findFlightRouter = async (req, res) => {
  try {
    // const {id,top, skip} = req.query;
    const id = req.query.id;
    if (!id) {
      const find = await FlightService().findAllFlightRouter();
      // const sliceFind = find.slice(skip, top)
      res.status(200).json({
        message: find,
      });
    } else {
      const find = await FlightService().findOneFlightRouter(id);
      // let find = await Flight.findOne({router: flight.routeId, drivers: flight.driverId, shipment: flight.shipmentId})
      const flightJSON = JSON.parse(JSON.stringify(find));
      flightJSON.router.routePoints = await Promise.all(
        await flightJSON.router.routePoints.map(async point => {
          const spotEvents = await Promise.all(
            point.spotEvents.map(async event => {
              const ev = await spotEventServices.findSpotEventById(event._id);
              return {
                acecpted: event.acecpted,
                ...JSON.parse(JSON.stringify(ev)),
              };
            })
          );
          return { ...point, spotEvents };
        })
      );
      res.status(200).json({
        message: flightJSON,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
};

const createFlightRouter = async (req, res) => {
  try {
    // const flight = req.query;
    const flight = req.body;
    await FlightService().addFlightRouter(flight);
    res.status(200).json({
      message: "Рейс добавлен",
    });
  } catch (err) {
    res.status(400).json({
      message: "Рейс не добавлен",
    });
  }
};

const updateFlightRouter = (req, res) => {};

const deleteFlightRouter = (req, res) => {};

export {
  findFlightRouter,
  createFlightRouter,
  updateFlightRouter,
  deleteFlightRouter,
};

export class createBDRouter {}
