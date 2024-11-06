import axios from "axios";
import config from "../config";

const API_BASE_URL =
    config.ENV === "DEV"
        ? "http://localhost:5000"
        : "https://socialmedia-production-2474.up.railway.app";
export const getUserNotifications = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/notifications`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while fetching notifications."
        );
        return error.response?.data;
    }
};
