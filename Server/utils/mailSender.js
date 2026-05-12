const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) =>{
    try {
        const mailPort = Number(process.env.MAIL_PORT || 587);
        const isSecure =
          process.env.MAIL_SECURE === "true" ||
          mailPort === 465;

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: mailPort,
            secure:isSecure,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            }
          })

          let info = await transporter.sendMail({
            from: `Tutor Master <${process.env.MAIL_USER}>`,
            to: `${email}`, 
            subject: `${title}`, 
            html: `${body}`,
          });

            return info;
        
    } catch (error) {
        console.log("Error in mailSender", error.message);
    throw error;
    }
}

module.exports = mailSender;
