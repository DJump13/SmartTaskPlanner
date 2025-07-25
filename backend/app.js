const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); //load env variables from .env

const app = express();

app.use(cors());
app.use(express.json());

//API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

module.exports = app;
