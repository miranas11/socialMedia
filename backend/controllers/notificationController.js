const Notification = require("../models/Notification");

const getUserNotifications = async (req, res) => {
    const userId = req.user.userId;

    try {
        const notifications = await Notification.find({ userId });

        await Notification.updateMany({ userId, read: false }, { read: true });

        res.status(200).json({
            success: true,
            message: "Notifications fetched and marked as read successfully.",
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching notifications.",
            error: error.message,
        });
    }
};

module.exports = {
    getUserNotifications,
};
