import CrewModel from "../models/CrewModel.js";
import CrewService from "../services/CrewRouterService.js";
import {wss} from "../server.js";
import WebSocket from "ws";


const findCrew = async (req, res) => {
    try {
        let {top, skip} =  req.query;
        let crewId = req.query.id
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
    try {
        const crewBody = req.body
        if (crewBody){
            const findCrew = await CrewModel.findOne({drivers: crewBody.drivers})
            if (findCrew){
                await  CrewModel.updateOne({drivers: crewBody.drivers}, {$set: {vehicle: crewBody.vehicle}})
                res.status(200).json({
                    message: "Экипаж добавлен"
                })
            }else {
                await CrewService().addCrew(crewBody)
                res.status(200).json({
                    message: "Экипаж добавлен"
                })
            }
            wss.clients.forEach( (client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({
                        result: "Crew add"
                    }))

                }
            })

        }
        else {
            res.status(200).json({
                message: "Экипаж не добавлен "
            })
        }

    } catch (err) {
        res.status(403).json({
            message: "Ошибка создания экипажа" + err
        })
    }



}

const updateCrew = (req, res) => {

}

const deleteCrew = (req, res) => {

}


export  {findCrew, createCrew, updateCrew, deleteCrew};