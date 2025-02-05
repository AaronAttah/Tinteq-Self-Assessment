import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  // BASIC INFORMATION
  // _id?: mongoose.Types.ObjectId;
  email: string;
  password: string | undefined;
  completion_percent: number;
  full_name?: string;
  role: mongoose.Types.ObjectId;
}
