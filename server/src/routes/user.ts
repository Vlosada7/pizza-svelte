import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import User, { CartItemSchema } from "../models/user";

const createUserSchema = z.object({
	name: z.string(),
	lastname: z.string(),
	email: z.string().email(),
	address: z.string().optional(),
	phone: z.string().optional(),
	cart: z.any().optional(),
	lastOrders: z.any().optional(),
});

const CartItemZodSchema = z.object({
	productId: z.string(),
	price: z.number(),
	quantity: z.number(),
});

export const createUser = publicProcedure
	.input(createUserSchema)
	.mutation(async ({ input }) => {
		// Verifica se já existe um usuário com o mesmo e-mail
		const existingUser = await User.findOne({ email: input.email });
		if (existingUser) {
			throw new Error("Email já está em uso.");
		}

		const newUser = new User(input);
		await newUser.save();
		return newUser;
	});

const updateUserSchema = z.object({
	id: z.string(),
	update: createUserSchema.partial(),
});

export const updateUser = publicProcedure
	.input(updateUserSchema)
	.mutation(async ({ input }) => {
		const updatedUser = await User.findOneAndUpdate(input.email, input.update, {
			new: true,
		});
		return updatedUser;
	});
export const getUserByEmail = publicProcedure
	.input(
		z.object({
			email: z.string().email(),
		})
	)
	.query(async ({ input }) => {
		const user = await User.findOne({ email: input.email });
		if (user) {
			return user;
		}
	});

export const addItemToCart = publicProcedure
	.input(
		z.object({
			email: z.string(),
			item: CartItemZodSchema,
		})
	)
	.mutation(async ({ input }) => {
		const user = await User.findOne({ email: input.email });
		if (!user) {
			throw new Error("Usuário não encontrado.");
		}

		// Verifica se o usuário tem um carrinho, se não, cria um novo
		if (!user.cart) {
			user.cart = { items: [], total: 0 };
		}

		// // // Procura o item no carrinho
		const existingItemIndex = user.cart.items.findIndex(
			(cartItem) => cartItem.productId === input.item.productId
		);

		if (existingItemIndex > -1) {
			// Se o item já existe no carrinho, atualiza a quantidade
			user.cart.items[existingItemIndex].quantity += input.item.quantity;
		} else {
			// Se o item não existe no carrinho, adiciona-o
			user.cart.items.push(input.item);
		}

		// // // Atualiza o total do carrinho
		user.cart.total = user.cart.items.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		);
		try {
			await user.save();
			return user;
		} catch (error) {
			console.error("Erro ao salvar:", error);
		}
	});

	export const removeItemFromCart = publicProcedure
		.input(
			z.object({
				email: z.string(),
				productId: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const user = await User.findOne({ email: input.email });
			if (!user) {
				throw new Error("Usuário não encontrado.");
			}

			const itemIndex = user.cart.items.findIndex(
				(item) => item.productId === input.productId
			);

			if (itemIndex > -1) {
				if (user.cart.items[itemIndex].quantity > 1) {
					user.cart.items[itemIndex].quantity -= 1;
				} else {
					user.cart.items.splice(itemIndex, 1); // Remove o item do array
				}

				// Recalcula o total do carrinho
				user.cart.total = user.cart.items.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			}

			try {
				await user.save();
				return user.cart;
			} catch (error) {
				console.error("Erro ao retirar produto", error);
			}
		});

		export const finalizeOrder = publicProcedure
			.input(
				z.object({
					email: z.string(),
				})
			)
			.mutation(async ({ input }) => {
				const user = await User.findOne({ email: input.email });
				if (!user) {
					throw new Error("Usuário não encontrado.");
				}

				// Cria um novo pedido com os itens do carrinho
				const newOrder = {
					items: user.cart.items,
					total: user.cart.total,
					orderDate: new Date(),
					status: "Finalizado", // ou qualquer status que você deseje
				};

				// Adiciona o novo pedido a lastOrders e limpa o carrinho
				user.lastOrders.push(newOrder);
				user.cart = { items: [], total: 0 };

				try {
					await user.save();
					return user;
				} catch (error) {
					console.error("Erro ao passar o carrinho para os lastOrders", error);
				}
			});
	


export const userRouter = router({
	create: createUser,
	update: updateUser,
	getByEmail: getUserByEmail,
	addItemToCart,
	removeItemFromCart,
	finalizeOrder,
});
