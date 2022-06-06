import CrewModel from "../models/CrewModel.js";
import CrewService from "../services/CrewRouterService.js";


const findCrew = async (req, res) => {
    try {
        let {top, skip} =  req.query;
        let crewId = req.params.id
        // const find = await CrewModel.findOne({_id: crewId})
        if (!crewId) {
            const find = await CrewService().findAllCrew();
            const sliceFind = find.slice(skip, top)
            res.status(200).json({
                message: sliceFind
            })
        } else {
            const find = await CrewService().findOneCrew(crewId)
            // const find = await CrewModel.findOne({employee: id.employee, vehicle: id.vehicle}).populate("employee").populate("vehicle")
            // const find = await CrewModel.findOne({employee: id.employee, vehicle: id.vehicle})
            // console.log(find)
            res.status(200).json({
                message: find
            })
        }
        // const find = await getService().findOneCrew(crewId)
        // // const find = await CrewModel.findOne({employee: id.employee, vehicle: id.vehicle}).populate("employee").populate("vehicle")
        // // const find = await CrewModel.findOne({employee: id.employee, vehicle: id.vehicle})
        // // console.log(find)
        // res.status(200).json({
        //     message: find
        // })
    }
    catch (err) {
        res.status(500).json(err)
    }

}

const createCrew = async (req, res) => {
    const crew = req.query
    await CrewService().addCrew(crew)
    res.status(200).json({
        message: "Экипаж добавлен"
    })

}

const updateCrew = (req, res) => {

}

const deleteCrew = (req, res) => {

}


export  {findCrew, createCrew, updateCrew, deleteCrew};