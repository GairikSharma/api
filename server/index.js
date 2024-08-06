const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 7000;

// Configure CORS to allow requests from your frontend
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
    from: process.env.EMAIL, // Set the authenticated sender's email address
    to: process.env.EMAIL,   // Your own email address as the recipient
    replyTo: email,          // Sender's email address
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error occurred while sending email");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
