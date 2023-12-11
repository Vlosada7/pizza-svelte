import { Request, Response } from "express";
// import CartModel from "../models/Cart";

const createCart = async (req: Request, res: Response) => {
	res.send("Creating cart working");
};

const updateCart = async (req: Request, res: Response) => {
	res.send("update cart working");
};

export { createCart, updateCart };
