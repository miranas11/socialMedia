import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getUserProfile,
    updateUserProfile,
} from "../../controllers/userController";
import "../../style/profilePage.css";
import photo from "../../assets/no_profile.png";
import ProfileDetails from "../profilePage/profileDetails";
import { sendFriendRequest } from "../../controllers/friendRequestController";
import FriendsList from "../profilePage/friendList";

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const isLoggedInUser = !id || id == user.userId;
    const [profileData, setProfileData] = useState({
        username: "",
        profileImage: "",
        lastLogin: "",
        friendsList: [],
        createdAt: "",
        email: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        username: "",
        email: "",
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            const response = await getUserProfile(
                isLoggedInUser ? user.userId : id,
                localStorage.getItem("token")
            );
            if (response.success) {
                setProfileData(response.data);
                setEditData({
                    username: response.data.username,
                    email: response.data.email,
                });
            }
        };
        fetchProfileData();
    }, [id]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const response = await updateUserProfile(
            editData,
            localStorage.getItem("token")
        );
        if (response.success) {
            setProfileData(response.data);
            setIsEditing(false);
        }
    };

    const handleAddFriend = async () => {
        const response = await sendFriendRequest(
            id,
            localStorage.getItem("token")
        );
        if (response.success) {
            alert("Friend request sent successfully.");
        } else {
            alert("Failed to send friend request.");
        }
    };

    return (
        <div className="profile-page">
            <div className="profile-left-section">
                <div className="profile-card">
                    <div className="profile-header">
                        <img
                            src={photo}
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="profile-header-content">
                            <h2 className="profile-name">
                                {isLoggedInUser && isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={editData.username}
                                        onChange={handleEditChange}
                                        className="profile-edit-input"
                                    />
                                ) : (
                                    profileData.username
                                )}
                            </h2>
                            {!isLoggedInUser && (
                                <button
                                    onClick={handleAddFriend}
                                    className="add-friend-button"
                                >
                                    Add to Friend
                                </button>
                            )}
                        </div>
                    </div>

                    <ProfileDetails
                        profileData={profileData}
                        isEditing={isEditing}
                        editData={editData}
                        handleEditChange={handleEditChange}
                        isLoggedInUser={isLoggedInUser}
                    />

                    {isLoggedInUser && isEditing && (
                        <button onClick={handleSave} className="save-button">
                            Save Changes
                        </button>
                    )}
                    {isLoggedInUser && !isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="edit-button"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
            <div className="profile-right-section">
                <FriendsList
                    friendsList={profileData.friendsList}
                    navigate={navigate}
                    isLoggedInUser={isLoggedInUser}
                />
            </div>
        </div>
    );
};

export default ProfilePage;
