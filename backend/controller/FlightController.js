import FlightService from "../services/FlightRouterService.js";
import spotEventServices from "../services/spotEventServices.js";
import broadcastMessages, {wss} from "../server.js";
import WebSocket from "ws";

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
    const aboutFlight = await FlightService().addFlightRouter(flight);
    wss.clients.forEach( (client) => {
      client.id = flight.drivers
      if (client.readyState === WebSocket.OPEN) {
        // console.log(client.id)
        // console.log(flight)
        if(client.id === flight.drivers) {
          client.send(JSON.stringify({
            method: "addFlightRoute",
            ...aboutFlight._doc
          }
             ));
        }
      }
    });


    // broadcastMessages(null, {driverId: aboutFlight._doc.drivers._doc._id , body: aboutFlight._doc})
    // wss.clients.forEach( (client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(JSON.stringify({
    //       result: aboutFlight._doc
    //     }))
    //
    //   }
    // })
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
