import { generateStreamToken } from "../lib/stream.js";
export async function getStreamToken(req, res) {
    try {
        const token = generateStreamToken(res.user.id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: " Internal Server Error!" });
        console.error("Error generating stream token:", error.message);
    }
}