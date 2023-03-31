
const nodemailer = require("nodemailer");

exports.sendEmail = ({ from = process.env.EMAIL, to, subject, text },) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
      method: "LOGIN",
    },
  });
  // console.log(process.env.EMAIL, process.env.EMAIL_PASSWORD);
  // setup email data with unicode symbols
  let mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
