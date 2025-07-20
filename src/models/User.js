import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userschema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        bio: {
            type: String,
            default: ""
        },
        profilePic: {
            type: String,
            default: ""
        },
        nativeLanguage: {
            type: String,
            default: ""
        },
        location: {
            type: String,
            default: ""
        },
        isOnboarded: {
            type: Boolean,
            default: false
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        ],
    },
    { timestamps: true });

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

userschema.methods.matchPassword = async function (enteredPassword) {
    const isPasswordMatch = await bcrypt.compare(enteredPassword, this.password);
    return isPasswordMatch;
};
const User = mongoose.model("User", userschema);
export default User;
