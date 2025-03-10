const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 4000;

let corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send(`Server is running on port ` + SERVER_PORT);
});

app.listen(process.env.SERVER_PORT);