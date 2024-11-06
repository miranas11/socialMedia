const ActivityLog = require("../models/ActivityLog");

const getUserActivityLogs = async (req, res) => {
    const userId = req.user.userId;

    try {
        const activityLogs = await ActivityLog.find({ userId }).sort({
            timestamp: -1,
        });

        if (!activityLogs || activityLogs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No activity logs found for the user.",
                error: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Activity logs fetched successfully.",
            data: activityLogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching activity logs.",
            error: error.message,
        });
    }
};

module.exports = {
    getUserActivityLogs,
};
