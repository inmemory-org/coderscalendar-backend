const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const User = require("../models/UserModel");
const router = express.Router();
const { body, validationResult, Result } = require("express-validator");
const axios = require("axios");
const message = require("../notification/message");

// add user into our database : Create User : POST
router.post(
  "/createuser",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    const success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    // checking if the email already exists in our database
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Please Enter Valid Email!!! Your email already exists",
        });
      }
      user = await User.create({
        email: req.body.email,
      });

      res.json({ success: true, user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

router.get("/getusers", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      var userMap = {};

      users.forEach(function (user) {
        userMap[user.id] = user;
        console.log(user.email);
      });

      res.send(userMap);
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteuser", async (req, res) => {
  const success = false;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user == null) {
      return res
        .status(400)
        .json({ success, error: "email not found in our database" });
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

async function contestStartIn24Hours() {
  let res = await axios.get("https://kontests.net/api/v1/all");

  let data = res.data;
  let processed_data = [];
  await data.forEach((element) => {
    if (element.in_24_hours === "Yes") {
      processed_data.push(element);
    }
  });

  return processed_data;
}

cron.schedule("1 * * * * *", () => {
  try {
    (async function run() {
      console.log("running notification...");
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      // let testAccount = await nodemailer.createTestAccount();

      // // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.SYSTEM_EMAIL, // generated ethereal user
          pass: process.env.SYSTEM_PASSWORD, // generated ethereal password
        },
      });

      let data = await contestStartIn24Hours();

      try {
        User.find({}, function (err, users) {
          if (users.length) {
            users.forEach(async function (user) {
              await transporter.sendMail({
                from: process.env.MAIL_FROM, // sender address
                to: user.email, // list of receivers
                subject: "Your upcoming Coding Contests", // Subject line
                text: `Hi, Ready for contest`, // plain text body
                html: message.htmlbody(data), // html body
              });
            });
          }
        });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    })();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
