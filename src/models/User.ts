import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete";

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      lowercase: true,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },

    full_name: {
      type: String,
      required: false,
    },

    role: {
      type: Schema.Types.ObjectId,
      ref: "UserRoles",
      required: false,
    },

    completion_percent: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password as string, salt);
  next();
});

userSchema.plugin(MongooseDelete, { deletedBy: true, deletedByType: String });

export const User = mongoose.model<IUser, SoftDeleteModel<IUser>>(
  "User",
  userSchema
);
