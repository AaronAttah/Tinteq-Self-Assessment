import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories";
import { StatusCodes } from "../utils";
import { signAccessToken } from "../validations";

export default class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  // SERVICE-RELATED METHODS

  public async payment(req: Request) {
    const filter = {
      email: req?.user?.email,
    };
    const userExist = await this.authRepository.findUser(filter);

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "invalid credentials",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "operation performed successfully by the admin",
    };
  }

  public async cargo(req: Request) {
    const filter = {
      email: req?.user?.email,
    };
    const userExist = await this.authRepository.findUser(filter);

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "invalid credentials",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "operation performed successfully by the shipper user",
    };
  }

  public async dispatch(req: Request) {
    const filter = {
      email: req?.user?.email,
    };
    const userExist = await this.authRepository.findUser(filter);

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.UNAUTHORIZED,
        STATUS: false,
        MESSAGE: "invalid credentials",
      };
    }

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "operation performed successfully by the carrier user",
    };
  }
}
