import React, { useState, useEffect } from "react";
import "../../style/friendList.css";
import no_logo from "../../assets/no_profile.png";
import { fetchMessages, sendMessage } from "../../controllers/chatController";
import io from "socket.io-client";
import config from "../../config";

const API_BASE_URL =
    config.ENV === "DEV"
        ? "http://localhost:5000"
        : "socialmedia-production-2474.up.railway.app";

const socket = io.connect(API_BASE_URL);

const FriendsList = ({ friendsList, navigate, isLoggedInUser }) => {
    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        console.log(isLoggedInUser);
        if (isLoggedInUser) {
            const user = JSON.parse(localStorage.getItem("user"));

            if (user && user.userId) {
                console.log("abc");
                socket.emit("join", user.userId);
            }

            socket.on("message", (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            return () => {
                socket.off("message");
            };
        }
    }, []);

    useEffect(() => {
        if (chatUser) {
            fetchMessages(chatUser._id).then((fetchedMessages) => {
                setMessages(fetchedMessages.data);
            });
        }
    }, [chatUser]);

    const handleSendMessage = async () => {
        const messageData = await sendMessage(chatUser._id, newMessage);
        setMessages([...messages, messageData.data]);
        socket.emit("message", {
            newMessage,
            receiverId: chatUser._id,
        });
        setNewMessage("");
    };

    return (
        <div className="friends-list">
            {!chatUser ? (
                <>
                    <h2>Friends</h2>
                    {friendsList.length > 0 ? (
                        <div className="friends-container">
                            {friendsList.map((friend) => (
                                <div
                                    key={friend._id}
                                    className="friend-tile"
                                    onClick={() =>
                                        navigate(`/profile/${friend._id}`)
                                    }
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
                                                    setChatUser(friend);
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
                </>
            ) : (
                <div className="chat-container">
                    <h2>Chat with {chatUser.username}</h2>
                    <button
                        onClick={() => setChatUser(null)}
                        className="back-to-friends-button"
                    >
                        Back to Friends
                    </button>
                    <div className="messages-container">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${
                                    msg.senderId === chatUser._id
                                        ? "received"
                                        : "sent"
                                }`}
                            >
                                <p>{msg.message}</p>
                            </div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message"
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FriendsList;
