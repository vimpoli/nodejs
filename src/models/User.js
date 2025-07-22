import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        lowercase: true,
        validate: {
            validator: (val) => {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return emailRegex.test(val);
            },
            message: "Invalid email address",
        },
        unique: [true, "User already exists"],
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        minlength: [6, "Password length must be greater than 5."]
    },
    roles: {
        type: [String],
        default: ["USER"],
        enum: ["USER", "ADMIN", "MERCHANT"],
    },
    address: {
        city: {
            type: String,
            required: [true, "User city address is required."],
        },
        country: {
            type: String,
            default: "Nepal"
        },
        province: {
            type: String,
            required: [true, "User provice is required."],
        },
        street: {
            type: String,
        },
    },
    phone: {
        type: String,
        required: [true, "Phone number is required."],
        unique: [true, "Phone number must be unique."]
    },
    profileImageUrl: {
        type: String,
        createdAt: {
            type: Date,
            default: Date.now(),
            immutable: true,
        },
    },
});

const model = mongoose.model("User", userSchema);

export default model;