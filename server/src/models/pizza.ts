import mongoose, { Document, Schema } from "mongoose";

interface Pizza {
	name: string;
	description: string;
	price: number;
	imageUrl: string;
}

const PizzaSchema = new Schema<Pizza & Document>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	imageUrl: { type: String, required: true },
});

const PizzaModel = mongoose.model<Pizza & Document>("Pizza", PizzaSchema);

export default PizzaModel;
