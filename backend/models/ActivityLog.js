const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
    },
    activityType: {
        type: String,
        enum: {
            values: [
                "Registration",
                "Login",
                "Profile Update",
                "Friend Request Sent",
                "Friend Request Accepted",
                "Friend Request Rejected",
                "Friend Added",
                "Friend Removed",
            ],
            message: "Invalid activity type",
        },
        required: [true, "Activity type is required"],
    },
    details: {
        type: String,
        required: [true, "Details are required"],
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
