import mongoose, { Schema } from "mongoose";
import { IName } from "../../interfaces";
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete";

const userRolesSchema = new Schema<IName>(
  {
    name: { type: String },
    access: { type: String },
  },
  { timestamps: true }
);

userRolesSchema.plugin(MongooseDelete, {
  deletedBy: true,
  deletedByType: String,
});

export const UserRoles = mongoose.model<IName, SoftDeleteModel<IName>>(
  "UserRoles",
  userRolesSchema
);
