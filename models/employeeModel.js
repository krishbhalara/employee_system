const db = require("../config/db");

const employeeModel = {
  executeCRUD: async (action, id, name, salary) => {
    return await db.query("CALL EmployeeCRUD(?, ?, ?, ?)", [
      action,
      id || null,
      name || null,
      salary || null,
    ]);
  },
};

module.exports = employeeModel;
