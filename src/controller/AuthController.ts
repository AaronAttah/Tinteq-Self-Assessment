import { Request, Response } from "express";
import { AuthService } from "../services";

const authService = new AuthService();
class UserController {
  constructor() {}

  public async registerAccount(req: Request, res: Response) {
    const data = await authService.registerAccount(req);

    return res.status(data?.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  }

  public async login(req: Request, res: Response) {
    const data = await authService.login(req);

    return res.status(data?.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
      data: data.DATA,
    });
  }
}

export default UserController;
