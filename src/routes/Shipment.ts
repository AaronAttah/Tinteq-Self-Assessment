import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware/Handlers";
import { shipmentController } from "../controller";
import {
  ReqValidator,
  AuthReqSchema,
  authToken,
  authRoles,
} from "../validations";
import { ADMINACCESS, SHIPPERACCESS, CARRIERACCESS } from "../config";

const { validateReqBody } = new ReqValidator();
const { shipmentBody } = new AuthReqSchema();

const router = express.Router();

router.post(
  "/payments",
  authToken,
  authRoles(ADMINACCESS),
  validateReqBody(shipmentBody()),
  asyncHandler(shipmentController.payment)
);

router.post(
  "/cargo",
  authToken,
  authRoles(SHIPPERACCESS, ADMINACCESS),
  validateReqBody(shipmentBody()),
  asyncHandler(shipmentController.cargo)
);

router.post(
  "/dispatch",
  authToken,
  authRoles(CARRIERACCESS, ADMINACCESS), 
  validateReqBody(shipmentBody()),
  asyncHandler(shipmentController.dispatch)
);

export default router;
