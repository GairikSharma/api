const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = new express();

app.use(bodyParser.json());
app.use(cors());

app.use(cors({
  origin: 'https://contact-gairik.netlify.app/' // Adjust this to match the origin of your frontend
}));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

  try {
    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: `Message from ${name}`,
        text: message,
    };
    await transporter.sendMail(mailOptions);
    res.send(mailOptions);
    res.status(200).send("Message sent");
  } catch (error) {
    res.status(500).send("Error occured", error);
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
