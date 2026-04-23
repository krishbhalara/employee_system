const db = require("../config/db");
const sendMail = require("../services/emailService");

const processLogs = async () => {
  try {
    const [logs] = await db.query(
      "SELECT * FROM audit_logs WHERE is_sent = FALSE",
    );

    console.log("----------->", logs)

    for (let log of logs) {
      console.log("---------log-----", log)
      try {
        await sendMail(log.action_type, log.message);

        await db.query("UPDATE audit_logs SET is_sent = TRUE WHERE id = ?", [
          log.id,
        ]);
      } catch (err) {
        console.error(`Mail error for log ID ${log.id}:`, err.message);

        // Stop retrying the rest of the emails if the login credentials are bad
        if (err.code === "EAUTH" || err.message.includes("Invalid login")) {
          console.error("Critical Email Error: Authentication failed. Aborting remaining emails for this run.");
          break;
        }
      }
    }
  } catch (error) {
    console.error("Job error:", error.message);
  }
};

module.exports = processLogs;
