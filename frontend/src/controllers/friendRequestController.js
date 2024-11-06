import axios from "axios";

//const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "http://socialmedia-production-4540.up.railway.app";
export const sendFriendRequest = async (receiverId, token) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/friend-requests/send`,
            { receiverId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while sending the friend request."
        );
        return error.response?.data;
    }
};

export const acceptFriendRequest = async (requestId, token) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/friend-requests/${requestId}/accept`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while accepting the friend request."
        );
        return error.response?.data;
    }
};

export const rejectFriendRequest = async (requestId, token) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/friend-requests/${requestId}/reject`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while rejecting the friend request."
        );
        return error.response?.data;
    }
};

export const getFriendRequests = async (token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/friend-requests`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while fetching friend requests."
        );
        return error.response?.data;
    }
};
