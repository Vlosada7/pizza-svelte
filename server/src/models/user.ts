import mongoose, { Schema, Document } from "mongoose";

interface User {
  name: string;
  lastname: string;
  email: string;
  address?: string;
  phone?: string;
  cart?: Cart[];
  lastOrders?: Order[];
}

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

export const CartItemSchema = new Schema({
	productId: { type: String, required: true },
	quantity: { type: Number, required: true },
	price: { type: Number, required: true },
});

interface Cart {
  items: CartItem[];
  total: number;
}

const CartSchema = new Schema({
  items: [CartItemSchema],
  total: { type: Number, required: true }
});

interface Order {
  items: CartItem[];
  total: number;
  orderDate: Date;
  status: string;
}

const OrderSchema = new Schema({
  items: [CartItemSchema],
  total: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true }
});

const UserSchema = new Schema({
	name: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	address: { type: String },
	phone: { type: String },
	cart: CartSchema,
	lastOrders: { type: [OrderSchema] },
});

interface UserDocument extends User, Document {}

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
