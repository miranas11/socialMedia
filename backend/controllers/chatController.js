const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");

const checkFriendship = async (userId, receiverId) => {
    const user = await User.findById(userId);
    return user.friendsList.includes(receiverId);
};

const sendMessage = async (req, res) => {
    const { receiverId, message } = req.body;
    const senderId = req.user.userId;

    try {
        if (!(await checkFriendship(senderId, receiverId))) {
            return res.status(403).json({
                success: false,
                message: "Only friends can send messages.",
            });
        }

        const newMessage = await ChatMessage.create({
            senderId,
            receiverId,
            message,
        });

        res.status(200).json({
            success: true,
            message: "Message sent successfully.",
            data: newMessage,
        });

        global.io.to(receiverId).emit("message", newMessage);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to send message.",
            error: error.message,
        });
    }
};

const getMessages = async (req, res) => {
    const { receiverId } = req.params;
    const senderId = req.user.userId;

    try {
        const messages = await ChatMessage.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        }).sort({ timestamp: 1 });

        res.status(200).json({
            success: true,
            message: "Messages retrieved successfully.",
            data: messages,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve messages.",
            error: error.message,
        });
    }
};

const markAsRead = async (req, res) => {
    const { messageId } = req.params;

    try {
        const message = await ChatMessage.findByIdAndUpdate(
            messageId,
            { status: "read" },
            { new: true }
        );

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Message marked as read.",
            data: message,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to mark message as read.",
            error: error.message,
        });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    markAsRead,
};
