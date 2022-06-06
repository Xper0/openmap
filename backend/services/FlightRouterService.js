import FlightRouterModel from "../models/FlightRouterModel.js";

const FlightService = () => {
    return {
        findAllFlightRouter:  () => {
            return FlightRouterModel.find({});
        },
        findOneFlightRouter:  (id) => {
            return FlightRouterModel.findOne({_id: id});
        },
        addFlightRouter: (flightRouter) => {
            return FlightRouterModel.create(flightRouter)
        }

    }
}


export default FlightService;