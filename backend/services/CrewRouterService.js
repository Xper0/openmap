import CrewModel from "../models/CrewModel.js";


const getService = () => {
    return {
        findOneCrew:  (crew) => {
            return CrewModel.findOne({_id: crew});
        },
        findAll:  () => {
            return CrewModel.findOne({});
        }

    }

    // async function findOneCrew {
    //     const findCrew = await CrewModel.findOne({_id: crew})
    //     return findCrew
    // }}
    // const findOneCrew = async (crew) => {
    //     const findCrew = await CrewModel.findOne({_id: crew})
    //     return findCrew
    // }
}
// const findOneCrew = async (crew) => {
//     const findCrew = await CrewModel.findOne()
//     return findCrew
// }




export default getService;