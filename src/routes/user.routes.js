import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getUserFriends, sendFriendRequest, acceptFriendRequest } from "../controllers/user.controllers.js";


const router = express.Router();
router.use(protectRoute);
router.get("/", getRecommendedUsers);
router.get("/friends", getUserFriends);
router.post("/friends-request/:id", sendFriendRequest);
router.put("/friends-request/:id/accept", acceptFriendRequest);
export default router;