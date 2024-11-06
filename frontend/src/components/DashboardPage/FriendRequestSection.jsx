import React, { useEffect, useState } from "react";
import {
    getFriendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
} from "../../controllers/friendRequestController";
import "../../style/friendRequestSection.css";
import Loading from "../common/Loading";
import noimage from "../../assets/no_profile.png";

const FriendRequestSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [friendRequests, setFriendRequests] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFriendRequests = async () => {
            const response = await getFriendRequests(token);
            if (response?.success) {
                setFriendRequests(response.data);
                setIsLoading(false);
            }
        };
        fetchFriendRequests();
    }, [token]);

    const handleAccept = async (requestId) => {
        const response = await acceptFriendRequest(requestId, token);
        if (response?.success) {
            setFriendRequests(
                friendRequests.filter((req) => req._id !== requestId)
            );
        }
    };

    const handleReject = async (requestId) => {
        const response = await rejectFriendRequest(requestId, token);
        if (response?.success) {
            setFriendRequests(
                friendRequests.filter((req) => req._id !== requestId)
            );
        }
    };

    return (
        <div className="friend-request-section">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <h2>Friend Requests</h2>
                    {friendRequests.length > 0 ? (
                        <div className="friend-request-list">
                            {friendRequests.map((request) => (
                                <div
                                    key={request._id}
                                    className="friend-request-item"
                                >
                                    <img
                                        src={
                                            request.sender.profileImage ||
                                            noimage
                                        }
                                        alt={`${request.sender.username}'s profile`}
                                        className="friend-request-avatar"
                                    />
                                    <div className="friend-request-details">
                                        <div className="friend-request-info">
                                            <p>{request.sender.username}</p>
                                            <p className="email">
                                                {request.sender.email}
                                            </p>
                                        </div>
                                        <div className="button-group">
                                            <button
                                                className="accept-button"
                                                onClick={() =>
                                                    handleAccept(request._id)
                                                }
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="reject-button"
                                                onClick={() =>
                                                    handleReject(request._id)
                                                }
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No friend requests available.</p>
                    )}
                </>
            )}
        </div>
    );
};

export default FriendRequestSection;
