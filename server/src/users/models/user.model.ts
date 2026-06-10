import { Schema, model, Document } from "mongoose";
import { USER_ROLES, type UserRole } from "../user-role";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  id: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, required: true, default: "shopper" },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
