const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.get("/employee", controller.getEmployees);
router.get("/employee/:id", controller.getEmployeeById);
router.post("/employee", controller.handleEmployee);
router.put("/employee/:id", controller.updateEmployee);
router.delete("/employee/:id", controller.deleteEmployee);

module.exports = router;
