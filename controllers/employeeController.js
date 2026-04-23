const employeeModel = require("../models/employeeModel");
const processLogs = require("../jobs/emailJob");

exports.handleEmployee = async (req, res) => {
  try {
    const { action, id, name, salary } = req.body;

    if (!action) {
      return res.status(400).json({
        success: false,
        message: "Action is required",
      });
    }

    await employeeModel.executeCRUD(action, id, name, salary);

    res.json({
      success: true,
      message: "Operation successful",
    });

    await processLogs();
  } catch (error) {
    console.error(" Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    await employeeModel.executeCRUD("UPDATE", id, name, salary);

    res.json({
      success: true,
      message: "Employee updated successfully",
    });

    await processLogs();
  } catch (error) {
    console.error(" Update Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await employeeModel.executeCRUD("DELETE", id, null, null);

    res.json({
      success: true,
      message: "Employee deleted successfully",
    });

    await processLogs();
  } catch (error) {
    console.error(" Delete Controller Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
