const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["read", "unread"],
        default: "unread",
    },
});
chatMessageSchema.index({ senderId: 1, receiverId: 1 });

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
