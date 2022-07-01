import garageModel from "../models/garageModel.js";

const findAllGarage = async (req, res) => {
    const findGarage= await garageModel.find({})
    res.status(200).json({
        message: findGarage
    })
}

const createGarage = async (req, res) => {
    const garage = req.query
    await garageModel.create(garage)
    res.status(200).json({
        message: "Гараж добавлен"
    })
    // const pars = JSON.parse(req.body)
    // console.log(pars)
    // const {} = req.body();

}

const updateGarage = (req, res) => {

}

const deleteGarage = (req, res) => {

}


export  {findAllGarage, createGarage, updateGarage, deleteGarage};