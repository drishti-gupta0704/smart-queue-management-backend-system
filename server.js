
const express = require("express");
const app = express(); //
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

app.use(express.static("public")); //

dotenv.config();
connectDB();

// const app = express();
app.use(express.json());
app.use(cors());

// Creating HTTP server and Socket.IO 
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // i can restrict this to my frontend URL later
    methods: ["GET", "POST", "PATCH", "DELETE"]
  }
});

// Store io instance in app for controllers
app.set("io", io);

// Socket.IO connection listener
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/tickets", ticketRoutes);

// Root route
// app.get("/", (req, res) => {
//   res.send("Server is running with Socket.IO!");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
}); //

// Error middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});