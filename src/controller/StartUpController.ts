import { Request, Response } from "express";
import { UserRoles } from "../models";
import { StatusCodes } from "../utils";

/**
 *  The startups Logic stops at the Data Logic which is the controller since
 *  it does not contain or require the business informations and permutations
 */
class StartUpController {
  constructor() {}

  /** ADD/POST/DELETE/PUT..................................................  */
  public async addRoles(req: Request, res: Response) {
    for (const name of req.body.name) {
      const object = {
        name: name,
      };
      await UserRoles.create(object);
    }
    res.status(StatusCodes.OK).json({
      status: true,
      message: "updated",
    });
  }

  public async deleteRole(req: Request, res: Response) {
    const object = {
      _id: req.body.roleId,
    };
    await UserRoles.findOneAndDelete(object);
    res.status(StatusCodes.OK).json({
      status: true,
      message: "deleted",
    });
  }

  /**GET....................................................................... */

  public async getRoles(req: Request, res: Response) {
    const data = await UserRoles.find().sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
      status: true,
      data: data,
    });
  }
}

export default StartUpController;
