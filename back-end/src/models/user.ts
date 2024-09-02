import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

userSchema.pre<UserType>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
