import React, { useEffect, useState } from "react";

import "../../style/dashboardPage.css";
import ActivitySection from "../DashboardPage/ActivitySection";
import NotificationSection from "../DashboardPage/NotificationSection";
import FriendRequestSection from "../DashboardPage/FriendRequestSection";
import { validateToken } from "../../controllers/userController";
import { useNavigate } from "react-router-dom";
import Loading from "../common/Loading";

export const DashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const validate = async () => {
            const user = JSON.parse(localStorage.getItem("user")) || "";
            const token = localStorage.getItem("token");

            const response = await validateToken(token);
            console.log(response);
            if (!response?.success) {
                navigate("/auth");
            }
            setIsLoading(false);
        };
        validate();
    }, [navigate]);

    return (
        <div className="dashboard-page">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {" "}
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
                </>
            )}
        </div>
    );
};
