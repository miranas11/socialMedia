import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

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
