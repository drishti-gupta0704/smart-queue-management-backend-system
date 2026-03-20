
// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const http = require("http");
// const { Server } = require("socket.io");
// const path = require("path"); 

// const connectDB = require("./config/db");

// const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const queueRoutes = require("./routes/queueRoutes");
// const ticketRoutes = require("./routes/ticketRoutes");
// const errorHandler = require("./validation/errorMiddleware");


// dotenv.config();


// connectDB();


// const app = express();


// app.use(express.json());
// app.use(cors());


// app.use(express.static("public"));


// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/pages/index.html"));
// });

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", 
//     methods: ["GET", "POST", "PATCH", "DELETE"]
//   }
// });


// app.set("io", io);

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/queues", queueRoutes);
// app.use("/api/tickets", ticketRoutes);


// app.use(errorHandler);


// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const queueRoutes = require("./routes/queueRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const errorHandler = require("./validation/errorMiddleware");

// Load env
dotenv.config();

// Connect MongoDB
connectDB();

// Create app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Routes to serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/dashboard.html"));
});
app.get("/admin.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/admin.html"));
});
app.get("/mytickets.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/mytickets.html"));
});

// Create HTTP server & Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST", "PATCH", "DELETE"] },
});
app.set("io", io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/tickets", ticketRoutes);

// Error handler (last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});