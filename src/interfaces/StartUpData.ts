import mongoose, { Document } from "mongoose";

export interface IName extends Document {
  // BASIC INFORMATION
  name: string;
  access: string;
}
