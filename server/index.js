const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = new express();
const port = 7000;

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gairiksharma2000@gmail.com",
    pass: "tqix ewpy ehow tnwi",
  },
});

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

  try {
    const mailOptions = {
        from: email,
        to: "gairiksharma2000@gmail.com",
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


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
