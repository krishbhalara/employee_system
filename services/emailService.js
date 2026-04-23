const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendMail = async (action, message) => {
  const html = `
      <div style="font-family: Arial; padding: 20px;">
         <h2>📢 DB Notification</h2>
         <p><b>Action:</b> ${action}</p>
         <p><b>Message:</b> ${message}</p>
      </div>
   `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.MENTOR_EMAIL,
    subject: `DB Alert: ${action}`,
    html,
  });
};

module.exports = sendMail;

// Verify transporter configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("Email service configuration error:", error.message);
  } else {
    console.log("Email service is successfully connected to Gmail");
  }
});
