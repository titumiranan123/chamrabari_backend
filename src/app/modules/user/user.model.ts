import { Schema, model } from "mongoose";
import { User } from "./user.interface";

const userSchema = new Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user'
    },
    accountStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'pending'
    }
});

export const userModel = model<User>('user', userSchema)