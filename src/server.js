import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./lib/db.js";
import "dotenv/config";

const app = express()
app.use(express.json());
const PORT = process.env.PORT
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})