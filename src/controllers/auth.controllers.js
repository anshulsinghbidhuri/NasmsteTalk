import User from "../models/User.js";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long!" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email address!" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email!" });
        }
        const idx = Math.floor(Math.random() * 1000) + 1; //generate a random number between 1 and 1000
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
        const newUser = new User({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        });
        const token = jwt.sign({ User: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict", // Helps prevent CSRF attacks
        });
        res.status(201).json({ message: "User created successfully!" });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error!" });

    }

} export async function login(req, res) {
    res.send("Logout Router!");
} export function logout(req, res) {
    res.send("Login Router!");
}
