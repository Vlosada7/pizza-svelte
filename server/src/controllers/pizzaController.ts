import { Request, Response } from "express";
import PizzaModel from "../models/pizza";

const postPizzas = async (req: Request, res: Response) => {
	const pizzasToCreate = [
		{
			name: "Peperoni",
			description: "Pizza de peperoni",
			price: 12.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/peperoni.jpg",
		},
		{
			name: "Marguerita",
			description: "Pizza de Marguerita",
			price: 11.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/margherita.jpg",
		},
		{
			name: "Portuguesa",
			description: "Pizza de Portuguesa",
			price: 13.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/portuguesa.jpg",
		},
		{
			name: "Atum",
			description: "Pizza de atum",
			price: 11.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/atum.jpg",
		},
		{
			name: "4 Queijos",
			description: "Pizza de 4 queijos",
			price: 12.5,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/quatro-queijos-jpg.webp",
		},
		{
			name: "Calabresa",
			description: "Pizza de Calabresa",
			price: 10.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/pizza-calabresa.jpg",
		},
		{
			name: "Tomate Seco com Rucula",
			description: "Pizza de tomate seco com rucula",
			price: 14.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/tomateSeco-rucula.jpg",
		},
		{
			name: "Jamon Iberico",
			description: "Pizza de Jamon Iberico",
			price: 17.0,
			imageUrl:
				"https://vlosada.s3.eu-north-1.amazonaws.com/Pizza-Svelte/pizza-jamon-iberico.jpg",
		},
	];
	const pizzas = await PizzaModel.find();
	if (pizzas.length === 0) {
		try {
			await PizzaModel.insertMany(pizzasToCreate);
			res.status(201).send("Pizzas criadas");
		} catch (error) {
			console.log(error);
			res.status(500).send("API ERROR");
		}
	} else {
		res.status(308).send("Banco de dados ja populado");
	}
};

export { postPizzas };
