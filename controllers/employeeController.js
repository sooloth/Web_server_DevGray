const Employee = require('../model/Employee')

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if (!employees || !employees[0]) return res.status(204).json({ 'message': 'No employees found' });
    res.json(employees);
    }

const createNewEmployee = async (req, res) => {
    if(!req?.body?.first_name || !req?.body?.last_name) {
        return res.status(400).json({ 'message': 'first and last names are required'});
    }
    try {
        const result = await Employee.create({
            first_name: req.body.first_name,
            last_name :  req.body.last_name 
        });

        res.status(201).json(result);
    } catch (err) {
        console.log(err);
    }

}
const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.first_name) employee.first_name = req.body.first_name;
    if (req.body?.last_name) employee.last_name = req.body.last_name;
    const result = await employee.save();
    res.json(result);
}

const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message' : 'Employee ID required.'})
    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}` });
    }
    const result = await employee.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message' : 'Employee ID required.'})

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.params.id}` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}