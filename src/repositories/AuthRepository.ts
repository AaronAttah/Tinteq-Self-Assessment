import { Document, HydratedDocument, Model, Schema } from "mongoose";
import { IUser } from "../interfaces";
import { User } from "../models";
import MongooseDelete, { SoftDeleteModel } from "mongoose-delete";

class AuthRepository {
  public UserModel: SoftDeleteModel<IUser>;

  constructor() {
    this.UserModel = User;
  }
  public async findUser(filter: object) {
    const response = await this.UserModel.findOne(filter);

    return response;
  }

  async findUsers(filter: object) {
    const response = await this.UserModel.find(filter);

    return response;
  }

  async findUserAndUpdate(filter: object) {
    const response = await this.UserModel.findOneAndUpdate(filter);

    return response;
  }
  async deleteOne(filter: object) {
    const user = await this.UserModel.findOneAndDelete(filter).exec();
    return user;
  }

  async createUser(filter: object) {
    const response = new this.UserModel(filter);

    const result = await response.save();

    return await this.UserModel.findById(result.id).select("-password");
  }
}

export default AuthRepository;
