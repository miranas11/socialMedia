const ActivityLog = require("../models/ActivityLog");
const Notification = require("../models/Notification");

const createActivityLog = async (userId, activityType, details) => {
    try {
        await ActivityLog.create({ userId, activityType, details });
    } catch (error) {
        console.error("Error creating activity log:", error);
    }
};

const createNotification = async (userId, type, message) => {
    try {
        await Notification.create({ userId, type, message });
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};

module.exports = {
    createActivityLog,
    createNotification,
};
