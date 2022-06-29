import EmployeeModel from "../models/EmployeeModel.js";


const findEmployee = async (req, res) => {
    const empl = req.query
    const find = await EmployeeModel.findOne({_id: empl.id})
    console.log(find)
    res.status(200).json({
        message: find
    })
}

const createEmployee = async (req, res) => {
    const employee = req.query
    await EmployeeModel.create(employee)
    res.status(200).json({
        message: "Сотрудник добавлен"
    })

}

const updateEmployee = (req, res) => {

}

const deleteEmployee = (req, res) => {

}


export  {findEmployee, createEmployee, updateEmployee, deleteEmployee};