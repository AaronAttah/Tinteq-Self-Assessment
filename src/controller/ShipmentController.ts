import { Request, Response } from "express";
import { ShipmentService } from "../services";

const shipmentService = new ShipmentService();
class UserController {
  constructor() {}

  public async payment(req: Request, res: Response) {
    const data = await shipmentService.payment(req);

    return res.status(data?.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
    });
  }

  public async cargo(req: Request, res: Response) {
    const data = await shipmentService.cargo(req);

    return res.status(data?.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
    });
  }

  public async dispatch(req: Request, res: Response) {
    const data = await shipmentService.cargo(req);

    return res.status(data?.STATUS_CODE).json({
      status: data.STATUS,
      message: data.MESSAGE,
    });
  }
}

export default UserController;
