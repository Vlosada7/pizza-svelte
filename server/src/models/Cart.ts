import mongoose, { Schema, Document } from "mongoose";
// import CartModel from "../models/Cart.ts"

interface Cart extends Document {
	userId: number;
	content: [number];
	total: number;
	finished: boolean;
}

const CartSchema: Schema = new Schema<Cart>({
	userId: { type: Number, unique: true, required: true },
	content: { type: [Number], required: true },
	total: { type: Number, required: true, min: 0 },
	finished: { type: Boolean, default: false, required: true },
});

const CartModel = mongoose.model<Cart>("Cart", CartSchema);

export default CartModel;
