import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['SUPERADMIN', 'ADMIN', 'USER'],
        default: "USER",
        required: true
    },
})

const User = model<IUser>('User', userSchema)
export default User;