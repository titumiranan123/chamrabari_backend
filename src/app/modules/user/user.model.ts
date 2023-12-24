import { Schema, model } from "mongoose";
import { User } from "./user.interface";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

export const userModel = model<User>('user', userSchema)