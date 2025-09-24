const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

const sendmail = async (template) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM_ADDRESS,
      to: template.to,
      subject: template.subject,
      html: template.html,
    });
    return info;
  } catch (error) {
    return error;
  }
};

module.exports = { sendmail };
