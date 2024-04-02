const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) =>{
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secure:true,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
            }
          })

          let info = await transporter.sendMail({
            from: "Anish jindal- StudyNotion" , // sender address
            to: `${email}`, 
            subject: `${title}`, 
            html: `${body}`, // plain text body
          });

            return info;
        
    } catch (error) {
        console.log("Error in mailSender", error.message);
    }
}

module.exports = mailSender;