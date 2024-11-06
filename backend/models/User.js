const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    profileImage: {
        type: String,
        default: "",
    },
    lastLogin: {
        type: Date,
        default: null,
    },
    friendsList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    twoFactorSecret: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.statics.findAndValidate = async function (email, password) {
    const foundUser = await this.findOne({ email });
    if (!foundUser) return false;
    const validPassword = await bcrypt.compare(password, foundUser.password);
    return validPassword ? foundUser : false;
};

module.exports = mongoose.model("User", userSchema);
