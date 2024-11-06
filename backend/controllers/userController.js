const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createActivityLog, createNotification } = require("../utils/utils");

const registerUser = async (req, res) => {
    const { username, email, password, profileImage } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Username, email, and password are required.",
            error: null,
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists.",
                error: null,
            });
        }

        const newUser = new User({
            username,
            email,
            password,
            profileImage,
        });

        await newUser.save();

        await createActivityLog(
            newUser._id,
            "Registration",
            "User registered an account"
        );

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: {
                token,
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.data,
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required.",
            error: null,
        });
    }

    try {
        const user = await User.findAndValidate(email, password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
                error: null,
            });
        }
        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        await createActivityLog(user._id, "Login", "User logged in");

        res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            data: {
                token,
                userId: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error.data,
        });
    }
};

const getUserProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id)
            .select("-password")
            .populate("friendsList", "username profileImage");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
                error: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully.",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the user profile.",
            error: error.message,
        });
    }
};

const updateUserProfile = async (req, res) => {
    const id = req.user.userId;
    const { username, email, profileImage } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
                error: null,
            });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        await createActivityLog(
            id,
            "Profile Update",
            "User updated their profile"
        );

        await createNotification(
            id,
            "Profile Update",
            "Your profile has been updated successfully."
        );

        res.status(200).json({
            success: true,
            message: "User profile updated successfully.",
            data: {
                userId: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the user profile.",
            error: error.message,
        });
    }
};

const getFriendsList = async (req, res) => {
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).populate(
            "friendsList",
            "username email profileImage"
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
                error: null,
            });
        }

        res.status(200).json({
            success: true,
            message: "Friends list fetched successfully.",
            data: user.friendsList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the friends list.",
            error: error.message,
        });
    }
};

const getUsersByUsername = async (req, res) => {
    const { username } = req.query;

    try {
        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username query parameter is required.",
            });
        }

        const users = await User.find({
            username: { $regex: username, $options: "i" },
        }).select("username profileImage ");

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found matching the given username filter.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving users.",
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    getFriendsList,
    getUsersByUsername,
};
