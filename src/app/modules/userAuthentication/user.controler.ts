import { NextFunction, Request, Response } from "express";
import User from "./user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// const jwt = require('jsonwebtoken');

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(404).json({ message: "invalid information" });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(404).json({ message: "Email Already Used " });
    }
    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, salt);

    const userData = {
      name: name,
      email: email,
      password: hassPassword,
    };
    const user = new User(userData);
    await user.save();
    return res.status(200).json({ message: "User Create Successfull", user });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid Data" });
    }
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const checkPasswor = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswor) {
      return res.status(400).json({ message: "User Not Found" });
    }
    // const { } = checkUser;
    const { name, role } = checkUser;

    const token = jwt.sign(
      { name, email, role },
      `${process.env.ACCESS_TOKEN}`,
      { expiresIn: "10h" }
    );
    return res
      .status(200)
      .json({ message: "Login Successfull", user: { name, email }, token });
  } catch (error) {
    next(error);
  }
};

export const loggedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).send({ user: req?.decoded });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    // Remove password property from each user
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json(usersWithoutPassword);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const update = await User.findOneAndUpdate(
      { _id: id },
      { $set: { role: "ADMIN" } },
      { new: true }
    );

    if (update?.role !== user.role) {
      return res.status(200).json({ message: "User updated successfully" });
    } else {
      return res.status(400).json({ message: "User update failed" });
    }
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.userId;

    const user = await User.findById(id);
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }
    if (user?.role === "SUPERADMIN") {
      res.status(401).json({ message: "Could Not Delete User" });
    }
    const deletedUser = await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    next(error);
  }
};
