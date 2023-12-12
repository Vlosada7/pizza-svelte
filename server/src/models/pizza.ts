import mongoose, { Document, Schema } from "mongoose";

interface Pizza {
	name: string;
	description: string;
	price: number;
}

const PizzaSchema = new Schema<Pizza & Document>({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
});

const PizzaModel = mongoose.model<Pizza & Document>("Pizza", PizzaSchema);

export default PizzaModel;
