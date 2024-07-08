require("dotenv").config();
const cors = require('cors');
const express = require("express");
const authRouter = require('./router/authRouter');
const connectToDB = require("./config/databaseConfig");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({
//     origin:process.env.CLIENT_URL,
//     Credential : true
// }));
app.use(cors())
app.use(cookieParser());

connectToDB();

app.use("/api/auth/", authRouter);
app.get("/api/get/", (req, res) => {
    return res.json("Api working");
});

module.exports = app;
