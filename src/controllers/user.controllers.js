import FriendRequest from "../models/friendRequest.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUser = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true },
            ],
        });
        res.status(200).json(recommendedUser);
    } catch (error) {
        console.error("Error fetching recommended users:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export async function getUserFriends(req, res) {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching user friends:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
};

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;
        if (myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself." });
        }
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found." });
        }
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user." });
        }
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ],
        });
        if (existingRequest) {
            return res.status(400).json({ message: "A friend request already exists between you and this user." });
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });
        res.status(201).json(friendRequest);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.error("Error sending friend request:", error);
    }
};

export async function acceptFriendRequest(req, res) {

};