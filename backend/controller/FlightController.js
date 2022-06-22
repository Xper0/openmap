import FlightService from "../services/FlightRouterService.js";



const findFlightRouter = async (req, res) => {
    try {
        const {id,top, skip} = req.query;
        if (!id) {
            const find = await FlightService().findAllFlightRouter();
            const sliceFind = find.slice(skip, top)
            res.status(200).json({
                message: sliceFind
            })
        }
        else {
            const find = await FlightService().findOneFlightRouter(id)
            // let find = await Flight.findOne({router: flight.routeId, drivers: flight.driverId, shipment: flight.shipmentId})
            res.status(200).json({
                message: find
            })
        }
    }
    catch (err) {
        res.status(400).json({
            message: err
        })
    }

}

const createFlightRouter = async (req, res) => {
    try {
        // const flight = req.query;
        const flight = req.body;
        await FlightService().addFlightRouter(flight)
        res.status(200).json({
            message: "Рейс добавлен"
        })
    }
    catch (err){
        res.status(400).json({
            message: "Рейс не добавлен"
        })
    }

}

const updateFlightRouter = (req, res) => {

}

const deleteFlightRouter = (req, res) => {

}


export  {findFlightRouter, createFlightRouter, updateFlightRouter, deleteFlightRouter};

export class createBDRouter {
}