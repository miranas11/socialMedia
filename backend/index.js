const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const friendRequestRoutes = require("./routes/friendRequestRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();
const rateLimit = require("express-rate-limit");

const customLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests. Please wait and try again later.",
        });
    },
});

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

global.io = io;

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room.`);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Middleware and Routes
// app.use(customLimiter);
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/friend-requests", friendRequestRoutes);
app.use("/api/activity-logs", activityLogRoutes);
app.use("/api/chatmessages", chatRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
const mongourl =
    process.env.ENV == "DEV"
        ? process.env.MONGO_URI
        : process.env.MONGO_PROD_URL;
mongoose
    .connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(mongourl);
        console.log("Connected to MongoDB");
        server.listen(PORT, () => {
            // Use server.listen instead of app.listen
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection error", error);
    });
