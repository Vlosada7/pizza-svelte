import { Request, Response } from "express";
// import UserModel from "../models/User";

const createUser = async (req: Request, res: Response) => {
	res.send("Create user working");
};

const getUser = async (req: Request, res: Response) => {
	res.send("get user working");
};

const updateUser = async (req: Request, res: Response) => {
	res.send("update user working");
};

export { createUser, getUser, updateUser };
