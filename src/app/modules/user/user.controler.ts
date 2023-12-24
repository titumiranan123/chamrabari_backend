import { Request, Response } from "express";
import { userToDb } from "./user.service";
import { userModel } from "./user.model";
import bcrypt from "bcrypt";


export const createUser = async (req: Request, res: Response) => {
    console.log(createUser)
    const { name, email, password, confirmPassword } = req.body;
    const user = await userModel.findOne({ email: email })
    if (user) {
        res.send({
            "status": "failed", "message": "Email Already exists"
        })
    } else {
        if (name && email && password && confirmPassword) {

            if (password === confirmPassword) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt)
                    const userDoc = new userModel({
                        name: name,
                        email: email,
                        password: hashPassword
                    })
                    const user = userToDb(userDoc)
                    res.status(200).json({
                        status: "user create sucessfull",
                        data: user
                    })
                } catch (error) {
                    console.log(error)
                    res.send({
                        "status": "failed", "message": "unable to register"
                    })
                }
            }
            else {
                res.send({
                    "status": "failed", "message": "Password are not match"
                })
            }

        } else {
            res.send({
                "status": "failed", "message": "All fields are required"
            })
        }
    }


}

// user login 

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (user.email === email && isMatch) {
                    res.send({ "status": "success", "message": "login success" })
                } else {
                    res.send({ "status": "failed", "message": "login failed" })
                }
            } else {
                res.send({
                    "status": "failed", "message": "Your are not register user"
                })
            }
        }
        else {
            res.send({
                "status": "failed", "message": "All Fields are Required"
            })
        }
    } catch (error) {
        console.log(error)
    }
}









// all user 

export const getUser = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            status: "success",
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            status: "error",
            message: "Failed to fetch users"
        });
    }
};