import { User } from "./user.interface"
import { userModel } from "./user.model"

export const userToDb = async (payload: User) => {
    const user = new userModel(payload)
    console.log(user)
    await user.save()
    return user;
}