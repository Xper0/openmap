import CrewModel from "../models/CrewModel.js";
import getService from "../services/CrewRouterService.js";


const findCrew = async (req, res) => {
    try {
        // let id =  req.query
        let crewId = req.params.id
        // const find = await CrewModel.findOne({_id: crewId})
        if (!crewId) {
            const find = await getService().findAll();
            res.status(200).json({
                message: find
            })
        }
        const find = await getService().findOneCrew(crewId)
        // const find = await CrewModel.findOne({drivers: id.drivers, vehicle: id.vehicle}).populate("drivers").populate("vehicle")
        // const find = await CrewModel.findOne({drivers: id.drivers, vehicle: id.vehicle})
        // console.log(find)
        res.status(200).json({
            message: find
        })
    }
    catch (err) {
        res.status(500).json(err)
    }

}

const createCrew = async (req, res) => {
    const crew = req.query
    await CrewModel.create(crew)
    res.status(200).json({
        message: "Экипаж добавлен"
    })

}

const updateCrew = (req, res) => {

}

const deleteCrew = (req, res) => {

}


export  {findCrew, createCrew, updateCrew, deleteCrew};