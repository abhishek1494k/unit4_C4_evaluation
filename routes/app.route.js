const express = require("express");
const app = express();
app.use(express.json());

const appRouter = express.Router();
appRouter.use(express.json());

require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { AppModel } = require("../models/model");

appRouter.get("/", (req, res) => {
  res.send("HOME PAGE");
});

appRouter.post("/users/register", async (req, res) => {
  let { name, email, gender, password } = req.body;
  // console.log(name,email,gender,password)
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log("err++++++", e);
      } else {
        const app = new AppModel({ name, email, gender, password: hash });
        await app.save();
        res.send("You are Registered");
      }
    });
  } catch (e) {
    console.log("err######", e);
  }
});

appRouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const app = await AppModel.find({ email });
    if (app.length > 0) {
      bcrypt.compare(password, app[0].password, (err, result) => {
        if (result) {
          var token = jwt.sign({ userID: app[0]._id }, process.env.key);
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send("Wrong Credentials");
        }
      });
    } else {
      res.send("Wrong Credentials");
    }
  } catch (e) {
    console.log("err", e);
  }
});


module.exports = { appRouter };
