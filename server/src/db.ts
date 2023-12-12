import mongoose from "mongoose";

export const dbConnect = async () => {
	try {
		const db = await mongoose.connect(
			"mongodb+srv://vlosada:abcd1234@cluster0.ldsiqol.mongodb.net/"
		);
		console.log("Database connected to", db.connection.db.databaseName);
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
};
