import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import { connectDB } from "./lib/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/user", chatRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})