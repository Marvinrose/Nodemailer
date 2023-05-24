const path = require("path");
var nodemailer = require("nodemailer");
require("dotenv").config();
var hbs = require("nodemailer-express-handlebars");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rozzeymarvin32@gmail.com",
    pass: process.env.PASS,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

var mailOptions = {
  from: "rozzeymarvin32@gmail.com",
  to: "rozzeymarvin32@gmail.com",
  subject: "Hello from Rozzey!",
  template: "email",
  attachments: [
    {
      filename: "dog_email.png",
      path: __dirname + "/views/images/dog_email.png",
      cid: "dog_email",
    },
  ],
  context: {
    title: "Heyy Baby 😘 ",
    text: "It's really nothing serious, I just wanted to say i love you xo xo much 😍 ",
    href: "http://www.rozzeymarvin.com",
  },
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
