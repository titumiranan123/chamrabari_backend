import { NextFunction, Request, Response } from "express";
import blogModel, { Blog } from "./blog.model";

export const createBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData = req.body;
    const result = new blogModel(postData); // Use the create method to create a new document
    res.json(result);
  } catch (error) {
    next(error);
  }
};
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const postData = req.body;
    const result = new blogModel(postData); // Use the create method to create a new document
    res.json(result);
  } catch (error) {
    next(error);
  }
};
