const express = require('express');
const router = express.Router();
const employeeControllers = require('../../controllers/employeeController')
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/')
    .get(employeeControllers.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeControllers.createNewEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeControllers.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeeControllers.deleteEmployee);

router.route('/:id')
    .get(employeeControllers.getEmployee)
module.exports = router;