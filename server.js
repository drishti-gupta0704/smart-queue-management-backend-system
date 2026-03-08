
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

connectDB();

dotenv.config();

const app = express();

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
 console.log("Server running");
});