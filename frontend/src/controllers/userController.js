import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/users/register`,
            userData
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred during registration."
        );
        return error.response?.data;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/users/login`,
            credentials
        );
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message || "An error occurred during login."
        );
        return error.response?.data;
    }
};

export const getUserProfile = async (userId, token) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/users/profile/${userId}`,
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
                "An error occurred while fetching the user profile."
        );
        return error.response?.data;
    }
};

export const updateUserProfile = async (userData, token) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/users/profile`,
            userData,
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
                "An error occurred while updating the user profile."
        );
        return error.response?.data;
    }
};

export const getFriendsList = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while fetching the friends list."
        );
        return error.response?.data;
    }
};

export const validateToken = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/validate`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.data.success) localStorage.removeItem("user");
        return response.data.success;
    } catch (error) {
        localStorage.removeItem("user");
        alert(
            error.response?.data?.message ||
                "An error occurred during token validation."
        );
        return error.response?.data;
    }
};

export const getUsersByUsername = async (username, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/search`, {
            params: { username },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        alert(
            error.response?.data?.message ||
                "An error occurred while searching for users."
        );
        return error.response.data;
    }
};