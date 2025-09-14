import express from "express";
import { signup, login, logout, onBoarding, Delete } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/onBoarding", protectRoute, onBoarding);
router.delete("/deleteUser", protectRoute, Delete);
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({ user: req.user });
});
export default router;  