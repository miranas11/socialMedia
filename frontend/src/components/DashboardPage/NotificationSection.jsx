import React, { useEffect, useState } from "react";

import "../../style/notificationSection.css";
import { getUserNotifications } from "../../controllers/notificationController";
import Loading from "../common/Loading";

const NotificationSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!token) return;

            const response = await getUserNotifications(token);
            console.log(response);
            if (response.success) {
                setNotifications(response.data);
                setIsLoading(false);
            } else {
                console.error("Failed to fetch notifications");
            }
        };

        fetchNotifications();
    }, [token]);

    return (
        <div className="notification-section">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h2>Notifications</h2>
                    {notifications.length > 0 ? (
                        <div className="notification-list">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className="notification-item"
                                >
                                    <p>
                                        <strong>{notification.type}</strong>
                                    </p>
                                    <p>{notification.message}</p>
                                    <p className="timestamp">
                                        {new Date(
                                            notification.timestamp
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No notifications found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default NotificationSection;
