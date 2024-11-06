import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getUserActivityLogs = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/activity-logs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        alert(
            error.response?.data?.message ||
                "An error occurred while fetching activity logs."
        );
        return error.response?.data;
    }
};
