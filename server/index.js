const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

// CORS configuration
app.use(cors());

app.use(bodyParser.json());

// Handle preflight requests
app.options("*", cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `Message from ${name}`,
    text: message,
    replyTo: email,
  };

  const visitorMailOption = {
    from: process.env.EMAIL,
    to: email,
    subject: "Message from Gairik",
    text: "Thank you for visiting my portfolio ❤",
    replyTo: process.env.EMAIL,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(visitorMailOption);
    res.status(200).send("Message sent");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error occurred while sending email");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
