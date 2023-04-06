const nodemailer = require("nodemailer");

// module.exports = async (email, subject, text) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       host: process.env.HOST,
//       service: process.env.SERVICE,
//       port: 465,
//       secure: Boolean(process.env.SECURE),
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.USER,
//       to: email,
//       subject: subject,
//       text: text,
//     });
//     console.log("email sent successfully");
//   } catch (error) {
//     console.log("email not sent!");
//     console.log(error);
//     return error;
//   }
// };

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: "danielwu68@zohomail.com",
        pass: "mavrYUvTKtxm",
      },
    });

    await transporter.sendMail({
      from: "danielwu68@zohomail.com", // sender address
      to: email,
      subject: subject, // Subject line
      text: text, // plain text body
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

// let transporter = nodemailer.createTransport({
//   host: "smtp.zoho.com",
//   secure: true,
//   port: 465,
//   auth: {
//     user: "danielwu68@zohomail.com",
//     pass: "mavrYUvTKtxm",
//   },
// });
// const mailOptions = {
//   from: "danielwu68@zohomail.com", // sender address
//   to: "ggragon5438@gmail.com",
//   subject: "Test", // Subject line
//   html: "Test", // plain text body
// };
// transporter.sendMail(mailOptions, function (err, data) {
//   if (err) {
//     console.log("Error " + err);
//   } else {
//     console.log("Email sent successfully");
//   }
// });
