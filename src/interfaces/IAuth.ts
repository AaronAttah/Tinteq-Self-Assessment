import mongoose, { Document } from "mongoose";

export interface IAuth extends Document {
  // BASIC INFORMATION
  email: string;
  password: string | undefined;
  completion_percent: number;

}
