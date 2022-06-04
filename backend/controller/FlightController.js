import Flight from "../models/FlightRouterModel.js";;

const findFlightRouter = async (req, res) => {
    const flight = req.query;
    let find = await Flight.findOne({router: flight.routeId, drivers: flight.driverId, shipment: flight.shipmentId})
    res.status(200).json({
        message: find
    })
}

const createFlightRouter = async (req, res) => {
    const flight = req.query;
    await Flight.create(flight)
    res.status(200).json({
        message: "Рейс добавлен"
    })

}

const updateFlightRouter = (req, res) => {

}

const deleteFlightRouter = (req, res) => {

}


export  {findFlightRouter, createFlightRouter, updateFlightRouter, deleteFlightRouter};