import React, { useEffect, useState } from "react";

import "../../style/activitySection.css";
import { getUserActivityLogs } from "../../controllers/activityLogController";
import Loading from "../common/Loading";

const ActivitySection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [activityLogs, setActivityLogs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchActivityLogs = async () => {
            if (!token) return;

            const response = await getUserActivityLogs(token);
            if (response.success) {
                setActivityLogs(response.data);
                setIsLoading(false);
            } else {
                console.error("Failed to fetch activity logs");
            }
        };

        fetchActivityLogs();
    }, [token]);

    return (
        <div className="activity-section">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {" "}
                    <h2>Activity</h2>
                    {activityLogs.length > 0 ? (
                        <div className="activity-log-container">
                            {activityLogs.map((log) => (
                                <div key={log._id} className="activity-log">
                                    <p>
                                        <strong>{log.activityType}</strong>
                                    </p>
                                    <p>{log.details}</p>
                                    <p className="timestamp">
                                        {new Date(
                                            log.timestamp
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No recent activities found.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ActivitySection;
