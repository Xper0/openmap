import VehicleModel from "../models/VehicleModel.js";


const findVehicle = (req, res) => {

}

const createVehicle = async (req, res) => {
    const vehicle = req.query
    await VehicleModel.create(vehicle)
    res.status(200).json({
        message: "Транспортное средство добавлено"
    })
    // const pars = JSON.parse(req.body)
    // console.log(pars)
    // const {} = req.body();

}

const updateVehicle = (req, res) => {

}

const deleteVehicle = (req, res) => {

}


export  {findVehicle, createVehicle, updateVehicle, deleteVehicle};