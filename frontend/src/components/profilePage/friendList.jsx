import React from "react";
import "../../style/friendList.css";
import no_logo from "../../assets/no_profile.png";

const FriendsList = ({ friendsList, navigate, isLoggedInUser }) => {
    return (
        <div className="friends-list">
            <h2>Friends</h2>
            {friendsList.length > 0 ? (
                <div className="friends-container">
                    {friendsList.map((friend) => (
                        <div
                            key={friend._id}
                            className="friend-tile"
                            onClick={() => navigate(`/profile/${friend._id}`)}
                        >
                            <img
                                src={friend.profileImage || no_logo}
                                alt={`${friend.username}'s profile`}
                                className="friend-avatar"
                            />
                            <div className="friend-info">
                                <p className="friend-username">
                                    {friend.username}
                                </p>

                                {isLoggedInUser && (
                                    <button
                                        className="open-chat-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            alert(
                                                `Open chat with ${friend.username}`
                                            );
                                        }}
                                    >
                                        Open Chat
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No friends found.</p>
            )}
        </div>
    );
};

export default FriendsList;
