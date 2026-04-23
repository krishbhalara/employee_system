const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const processLogs = require("./jobs/emailJob");

app.use(express.json());
app.use("/api", employeeRoutes);

// background job every 1 min
setInterval(processLogs, 60000);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
