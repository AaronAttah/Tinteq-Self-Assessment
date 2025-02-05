import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories";
import { StatusCodes } from "../utils";
import { welcomeUser } from "../utils";
import { signAccessToken } from "../validations";
export default class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  // SERVICE-RELATED METHODS

  public async registerAccount(req: Request) {
    const userExist = await this.authRepository.findUser({
      email: req.body.email,
    });

    if (userExist) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "Account exist on TINTEQ, kindly login to your account!",
      };
    }

    const userObject = {
      ...req.body,
      completion_percent: 50, //update profile counts 100% done
    };

    const createUser = await this.authRepository.createUser(userObject);

    await welcomeUser(createUser?.email, createUser?.full_name);

    return {
      STATUS_CODE: StatusCodes.CREATED,
      STATUS: true,
      MESSAGE: "account created successfully",
      DATA: createUser,
    };
  }

  public async login(req: Request) {
    const filter = {
      email: req.body.email,
    };
    // debugger
    const userExist = await this.authRepository.findUser(filter);
    // console.log(userExist);

    if (!userExist) {
      return {
        STATUS_CODE: StatusCodes.BAD_REQUEST,
        STATUS: false,
        MESSAGE: "User does not exist, Record not found",
      };
    }

    const password_match = await bcrypt.compare(
      req.body.password,
      userExist.password as string
    );

    if (!password_match)
      return {
        STATUS_CODE: StatusCodes.NOT_FOUND,
        STATUS: false,
        MESSAGE: "Invalid  Credentials",
      };

    const user = userExist.toObject();
    delete user.password;

    const tokenObject = {
      user: user?._id,
      email: user?.email,
      role: user?.role,
    };

    const token = await signAccessToken(tokenObject);

    return {
      STATUS_CODE: StatusCodes.OK,
      STATUS: true,
      MESSAGE: "User logged in  successfully!",
      DATA: {
        user,
        token,
      },
    };
  }
}
