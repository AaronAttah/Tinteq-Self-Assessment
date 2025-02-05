import mongoose, { Document } from "mongoose";

export interface IAuth extends Document {
  // BASIC INFORMATION
  name: string | undefined;
  email: string;
  password: string | undefined;
  verified: boolean;
  status: string;
  adminRole: IAdminRole | mongoose.Types.ObjectId;
}

export interface IAdminRole extends Document {
  // BASIC INFORMATION
  name: string;
}
