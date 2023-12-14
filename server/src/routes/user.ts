import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import User from "../models/user";

const createUserSchema = z.object({
	name: z.string(),
	lastname: z.string(),
	email: z.string().email(),
	address: z.string().optional(),
	phone: z.string().optional(),
	cart: z.any().optional(),
	lastOrders: z.any().optional(),
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
		const updatedUser = await User.findByIdAndUpdate(input.id, input.update, {
			new: true,
		});
		return updatedUser;
	});

export const userRouter = router({
	create: createUser,
	update: updateUser,
});
