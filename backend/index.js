const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const friendRequestRoutes = require("./routes/friendRequestRoutes");
const activityLogRoutes = require("./routes/activityLogRoutes");
// const chatMessageRoutes = require("./routes/chatMessageRoutes");
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
app.use(customLimiter);

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/friend-requests", friendRequestRoutes);
app.use("/api/activity-logs", activityLogRoutes);
// app.use("/api/chatmessages", chatMessageRoutes);
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_PROD_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Connection error", error);
    });
