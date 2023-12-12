import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import Pizza from "../models/pizza";

export const getPizzas = publicProcedure.query(async () => {
	const pizzas = await Pizza.find();
	return pizzas;
});

export const pizzasRouter = router({
	get: getPizzas,
});
