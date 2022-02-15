import express from "express";
import "dotenv/config";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import cron from "node-cron";
import User from "../models/UserModel.js";
const router = express.Router();
import { body, validationResult, Result } from "express-validator";
import htmlbody from "../notification/message.js";

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

const contestStartIn24Hours = async () => {
  const response = await fetch("https://kontests.net/api/v1/all", {
    method: "GET",
  });

  let data = await response.json();
  let processed_data = [];

  data.forEach(function (element) {
    if (element.in_24_hours === "Yes") {
      processed_data.push(element);
    }
  });

  return processed_data;
};

const findUsers = async () => {
  const response = await User.find({});
  return response;
};

cron.schedule("0 1 * * *", () => {
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: process.env.SYSTEM_EMAIL, // generated ethereal user
      pass: process.env.SYSTEM_PASSWORD, // generated ethereal password
    },
  });

  async function main() {
    try {
      let data = await contestStartIn24Hours();
      let users = await findUsers();

      for (let i = 0; i < users.length; i++) {
        let mailOptions = {
          from: process.env.SYSTEM_EMAIL, // TODO: email sender
          to: users[i].email, // TODO: email receiver
          subject: "Your upcoming Coding Contests",
          html: htmlbody.htmlbody(data),
        };

        transporter.sendMail(mailOptions, (err, user) => {
          if (err) {
            return console.log(err);
          }
          return console.log("Email sent!!!");
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  main();
});

export default router;
