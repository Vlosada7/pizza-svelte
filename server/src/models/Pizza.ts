import mongoose, { Schema, Document } from "mongoose";

interface Pizza extends Document {
	id: number;
	name: string;
	price: number;
}

const PizzaSchema: Schema = new Schema<Pizza>({
	id: { type: Number, unique: true, default: 0 },
	name: { type: String, unique: true, required: true },
	price: { type: Number, required: true },
});

const PizzaModel = mongoose.model<Pizza>("Pizza", PizzaSchema, "pizzas");

export default PizzaModel;
