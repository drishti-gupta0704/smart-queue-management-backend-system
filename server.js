
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const queueRoutes = require("./routes/queueRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const errorHandler = require("./validation/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/tickets", ticketRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Error middleware (keep it after all routes)
app.use(errorHandler);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow all origins for now
});

// Make io accessible in controllers
app.set("io", io);


server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});