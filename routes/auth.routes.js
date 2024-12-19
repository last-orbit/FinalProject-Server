const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//**************Signup
router.post("/signup", async (req, res, next) => {
  const { email, password, username, image } = req.body;
  console.log("inside the post route", req.body);
  try {
    const usernameAlreadyTaken = await UserModel.findOne({ username });
    const emailAlreadyTaken = await UserModel.findOne({ email });
    if (emailAlreadyTaken || usernameAlreadyTaken) {
      res.status(409).json({ message: "Invalid credentials" });
    } else {
      const salt = bcryptjs.genSaltSync(12);
      const hashedPassword = bcryptjs.hashSync(password, salt);
      const newUser = await UserModel.create({
        email,
        username,
        password: hashedPassword,
        image,
      });
      res.status(201).json({ message: "user has been created!", newUser });
    }
  } catch (error) {
    next(error);
  }
});
//**************login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await UserModel.findOne({ email });
    console.log(req.body, foundUser, process.env.TOKEN_SECRET);
    if (foundUser) {
      const frontEndUserPassword = password;
      const userINDBPassword = foundUser.password;

      const passwordsMatch = bcryptjs.compareSync(
        frontEndUserPassword,
        userINDBPassword
      );

      if (passwordsMatch) {
        const { _id, username } = foundUser;
        const currentUser = { _id, username };
        const authToken = jwt.sign(currentUser, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "8h",
        });
        console.log("here is the auth token", authToken);
        res.status(200).json({
          message: "User has logged in",
          authToken,
        });
      } else {
        const loginError = new Error("Invalid password credentials");
        loginError.statusCode = 400;
        throw loginError;
      }
    } else {
      const otherError = new Error("Invalid email credentials");
      otherError.statusCode = 400;
      throw otherError;
    }
  } catch (error) {
    next(error);
  }
});

//****************Update password */

//**************verify
router.get("/verify", isAuthenticated, async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.payload.currentUser._id);
    res.status(200).json({
      message: "All Humans must be Verified!!!",
      currentUser: {
        _id: currentUser._id,
        username: currentUser.username,
        image: currentUser.image,
      },
    });
  } catch (error) {
    next(error);
  }
});

//**************delete user if we need to as well in an account page or something
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted", deletedUser });
  } catch (error) {
    console.log("error on deleting user", error);
    next(error);
  }
});

//**************get all users
router.get('/users', async (req, res) => {
  UserModel
    .find()
    .then((allUsers) => {
      res.status(200).json({ message: 'Users found.', allUsers });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
