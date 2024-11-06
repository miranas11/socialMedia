import axios from "axios";
import config from "../config";

const API_BASE_URL =
    config.ENV === "DEV"
        ? "http://localhost:5000"
        : "https://socialmedia-production-2474.up.railway.app";
const getToken = () => {
    return localStorage.getItem("token");
};

export const fetchMessages = async (receiverId) => {
    try {
        const token = getToken();
        const response = await axios.get(
            `${API_BASE_URL}/api/chatmessages/${receiverId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
};

export const sendMessage = async (receiverId, message) => {
    try {
        const token = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/api/chatmessages/send`,
            {
                receiverId,
                message,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
    }
};
