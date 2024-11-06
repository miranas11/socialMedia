const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");
const { createActivityLog, createNotification } = require("../utils/utils");

const sendFriendRequest = async (req, res) => {
    const senderId = req.user.userId;
    const { receiverId } = req.body;

    try {
        if (senderId === receiverId) {
            return res.status(400).json({
                success: false,
                message: "You cannot send a friend request to yourself.",
                error: null,
            });
        }

        const sender = await User.findById(senderId);
        if (sender.friendsList.includes(receiverId)) {
            return res.status(400).json({
                success: false,
                message: "You are already friends with this user.",
                error: null,
            });
        }

        const reverseRequest = await FriendRequest.findOne({
            sender: receiverId,
            receiver: senderId,
        });

        if (reverseRequest) {
            return res.status(400).json({
                success: false,
                message: "User has already sent you a friend request.",
                error: null,
            });
        }

        const existingRequest = await FriendRequest.findOne({
            sender: senderId,
            receiver: receiverId,
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Friend request already sent.",
                error: null,
            });
        }

        const newRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId,
        });

        await newRequest.save();

        await createActivityLog(
            senderId,
            "Friend Request Sent",
            `Sent a friend request to user ID ${receiverId}`
        );

        await createNotification(
            receiverId,
            "Friend Request",
            `You have a new friend request from user ID ${senderId}`
        );

        res.status(201).json({
            success: true,
            message: "Friend request sent successfully.",
            data: {
                requestId: newRequest._id,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while sending the friend request.",
            error: error.message,
        });
    }
};

const acceptFriendRequest = async (req, res) => {
    const { id: requestId } = req.params;
    const receiverId = req.user.userId;

    try {
        const request = await FriendRequest.findById(requestId);

        if (!request || request.receiver.toString() !== receiverId) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found or unauthorized.",
                error: null,
            });
        }

        const sender = await User.findById(request.sender);
        const receiver = await User.findById(receiverId);

        sender.friendsList.push(receiverId);
        receiver.friendsList.push(request.sender);

        await sender.save();
        await receiver.save();

        // Delete the friend request document after accepting
        await request.deleteOne();

        await createActivityLog(
            receiverId,
            "Friend Request Accepted",
            `Accepted friend request from user ID ${request.sender}`
        );

        await createNotification(
            request.sender,
            "Friend Request",
            `User ID ${receiverId} has accepted your friend request`
        );

        res.status(200).json({
            success: true,
            message: "Friend request accepted.",
            data: {
                senderId: request.sender,
                receiverId,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while accepting the friend request.",
            error: error.message,
        });
    }
};

const rejectFriendRequest = async (req, res) => {
    const { id: requestId } = req.params;
    const receiverId = req.user.userId;

    try {
        const request = await FriendRequest.findById(requestId);

        if (!request || request.receiver.toString() !== receiverId) {
            return res.status(404).json({
                success: false,
                message: "Friend request not found or unauthorized.",
                error: null,
            });
        }

        // Delete the friend request document after rejecting
        await request.deleteOne();

        await createActivityLog(
            receiverId,
            "Friend Request Rejected",
            `Rejected friend request from user ID ${request.sender}`
        );

        await createNotification(
            request.sender,
            "Friend Request",
            `User ID ${receiverId} has rejected your friend request`
        );

        res.status(200).json({
            success: true,
            message: "Friend request rejected.",
            data: {
                requestId,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while rejecting the friend request.",
            error: error.message,
        });
    }
};

const getFriendRequests = async (req, res) => {
    const userId = req.user.userId;

    try {
        const requests = await FriendRequest.find({
            receiver: userId,
        }).populate("sender", "username email profileImage");

        res.status(200).json({
            success: true,
            message: "Friend requests fetched successfully.",
            data: requests,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching friend requests.",
            error: error.message,
        });
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    getFriendRequests,
};
