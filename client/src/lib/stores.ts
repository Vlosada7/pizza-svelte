import { writable } from 'svelte/store';

export const pizzas = writable([
	{
		name: 'Peperoni',
		description: 'Pizza de peperoni',
		price: 12.0,
		img: '/peperoni.jpg'
	},
	{
		name: 'Marguerita',
		description: 'Pizza de Marguerita',
		price: 11.0,
		img: '/margherita.jpg'
	},
	{
		name: 'Portuguesa',
		description: 'Pizza de Portuguesa',
		price: 13.0,
		img: '/portuguesa.jpg'
	},
	{
		name: 'Atum',
		description: 'Pizza de atum',
		price: 11.0,
		img: '/atum.jpg'
	},
	{
		name: '4 Queijos',
		description: 'Pizza de 4 queijos',
		price: 12.5,
		img: '/quatro-queijos.jpg'
	},
	{
		name: 'Calabresa',
		description: 'Pizza de Calabresa',
		price: 10.0,
		img: '/pizza-calabresa.jpg'
	},
	{
		name: 'Tomate Seco com Rucula',
		description: 'Pizza de tomate seco com rucula',
		price: 14.0,
		img: '/tomateSeco-rucula.jpg'
	},
	{
		name: 'Jamon Iberico',
		description: 'Pizza de Jamon Iberico',
		price: 17.0,
		img: '/pizza-jamon-iberico.jpg'
	}
]);
