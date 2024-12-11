// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//------ ROUTES ------//
// 👇 Index Route
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

//👮 Auth Route
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// //🤓 User Route
const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

// //📸 Image Route
const imageRoutes = require("./routes/images.routes");
app.use("/image", imageRoutes);

// //🥰 UserImage Route
const UserImageRoutes = require("./routes/userImage.routes");
app.use("/collection", UserImageRoutes);

// //💌 Comment Route
const commentRoutes = require("./routes/comments.routes");
app.use("/comment", commentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
