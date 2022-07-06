import CrewModel from "../models/CrewModel.js";


const CrewService = () => {

    return {
        findAllCrew: () => {
            return CrewModel.find({});
        },
        findOneCrew: (crew) => {
            return CrewModel.findOne({drivers: crew});
        },
        addCrew: (crew) => {
            return CrewModel.create(crew)
        }

    }
}


export default CrewService;