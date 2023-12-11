import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
	id: Number;
	firstName: String;
	lastName: String;
	address: String;
}

const UserSchema: Schema = new Schema<User>({
	id: { type: Number, unique: true, default: 0 },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	address: { type: String, required: true },
});

const UserModel = mongoose.model<User>("User", UserSchema, "users");

export default UserModel;
