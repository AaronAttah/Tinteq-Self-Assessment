import express, { NextFunction, Request, Response } from "express";
import { startUpController } from "../controller";
import dotenv from "dotenv";
dotenv.config();
import { authToken, authCrypto, authRoles } from "../validations";
import { ADMINACCESS } from "../config";

const router = express.Router();

/**POST REQUESTS */

router.post(
  "/roles",
  authToken,
  authRoles(ADMINACCESS),
  startUpController.addRoles
);

router.delete(
  "/roles",
  authToken,
  authRoles(ADMINACCESS),

  startUpController.deleteRole
);

/**GET REQUESTS */
router.get("/roles", authCrypto, startUpController.getRoles);

export default router;
