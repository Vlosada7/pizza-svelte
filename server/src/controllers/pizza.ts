import { Request, Response } from "express";
// import PizzaModel from "../models/Pizza";

const createPizza = async (req: Request, res: Response) => {
	res.send("Creating pizza working");
};

const getPizza = async (req: Request, res: Response) => {
	res.send("Creating pizza working");
};

export {createPizza, getPizza};