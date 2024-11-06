import React from "react";
import "../../style/profilePage.css";

const ProfileDetails = ({
    profileData,
    isEditing,
    editData,
    handleEditChange,
    isLoggedInUser,
}) => {
    return (
        <div className="profile-details">
            <div className="profile-item">
                <span className="label">Username</span>
                {isLoggedInUser && isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={editData.username}
                        onChange={handleEditChange}
                        className="profile-edit-input"
                    />
                ) : (
                    <span>{profileData.username}</span>
                )}
            </div>
            <div className="profile-item">
                <span className="label">Email</span>
                {isLoggedInUser && isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleEditChange}
                        className="profile-edit-input"
                    />
                ) : (
                    <span>{profileData.email}</span>
                )}
            </div>
            <div className="profile-item">
                <span className="label">Member Since</span>
                <span>{profileData.createdAt}</span>
            </div>
            <div className="profile-item">
                <span className="label">Last Login</span>
                <span>{profileData.lastLogin}</span>
            </div>
        </div>
    );
};

export default ProfileDetails;
