import React from "react";

import "../../style/dashboardPage.css";
import ActivitySection from "../DashboardPage/ActivitySection";
import NotificationSection from "../DashboardPage/NotificationSection";
import FriendRequestSection from "../DashboardPage/FriendRequestSection";

export const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <div className="left-section">
                <ActivitySection />
            </div>
            <div className="right-section">
                <div className="top-right">
                    <NotificationSection />
                </div>
                <div className="bottom-right">
                    <FriendRequestSection />
                </div>
            </div>
        </div>
    );
};
