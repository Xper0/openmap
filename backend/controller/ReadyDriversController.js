import ReadyDrivers from "../models/ReadyDriversModel.js";

const findReadyDrivers = async (req, res) => {
    const drivers = req.query;
    let find = await ReadyDrivers.findOne({})
    res.status(200).json({
        message: find
    })
}

const createReadyDrivers = async (req, res) => {
    const drivers = req.query;
    await ReadyDrivers.create(drivers)
    res.status(200).json({
        message: "Водитель готов"
    })

}

const updateReadyDrivers = (req, res) => {

}

const deleteReadyDrivers = (req, res) => {

}


export  {findReadyDrivers, createReadyDrivers, updateReadyDrivers, deleteReadyDrivers};