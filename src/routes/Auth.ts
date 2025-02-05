import express, { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middleware/Handlers";
import { authController } from "../controller";
import { ReqValidator, AuthReqSchema, authToken } from "../validations";

import dotenv from "dotenv";
dotenv.config();
const { validateReqBody } = new ReqValidator();
const { registerBody, loginBody } = new AuthReqSchema();

const router = express.Router();

router.post(
  "/register",
  validateReqBody(registerBody()),
  asyncHandler(authController.registerAccount)
);

router.post(
  "/login",
  validateReqBody(loginBody()),
  asyncHandler(authController.login)
);

export default router;
