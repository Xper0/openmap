import VehicleModel from "../models/VehicleModel.js";


const findVehicle = async (req, res) => {
    console.log(req)
    const findCar = await VehicleModel.find({})
    res.status(200).json({
        message: findCar
    })
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