
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
connectDB();

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
 console.log("Server running");
});