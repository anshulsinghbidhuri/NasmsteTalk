import monngoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await monngoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb connection Successful:${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
}