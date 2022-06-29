import Shipment from "../models/ShipmentModel.js";

const findShipment = async (req, res) => {
    const shipment = req.query;
    let find = await Shipment.find({})
    res.status(200).json({
        message: find
    })
}

const createShipment = async (req, res) => {
    const shipment = req.query;
    await Shipment.create({shipment})
    res.status(200).json({
        message: "Груз добавлен"
    })

}

const updateShipment = (req, res) => {

}

const deleteShipment = (req, res) => {

}


export  {findShipment, createShipment, updateShipment, deleteShipment};