import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "../utils";
import { getSystemCryptoKey } from "../utils";

import jwt from "jsonwebtoken";

import _ from "lodash";
import { JWT_SECRET } from "../config";

/**
 *
 * @param payload {
  "iss": "opexa.com",
  "aud": "user_id",
  "sub": "user_id",
  "iat": 1704632258,
  "exp": 1704633258,
  "prm": "user_id"
}
 */
interface User {
  user?: string;
  email?: string;
  role?: string;
}

export const signAccessToken = async (user: any): Promise<string> => {
  const token = jwt.sign(
    {
      _id: user?.user,
      email: user?.email,
      role: user?.role,
    },
    JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return token;
};

interface DecodedToken {
  user?: string;
  _id?: string;
  email?: string;
  role?: string;
  // Add other properties as needed based on the decoded token structure
}

// Declare a new property on the Request interface(this is bcause the req.user = decoded)
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const authToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    if (req.headers.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;

      req.user = decoded;

      next();
      return;
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Access Denied",
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: false,
      message: "Session Ended Please Login!",
    });
  }
};

export const authRoles = (...roles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req?.user?.role)) {
      res.status(403).json({ error: "Unauthorized access" });
      return;
    }
    next();
  };
};

export const authCrypto = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    // Assuming the key is sent in a custom header named 'X-Crypto-Key'

    const clientKey = req.headers["x-crypto-key"];
    const service = req.headers["x-tinteq"];
    //  const service = "Startup";

    if (!clientKey) {
      console.log({ msg: "Crypto key is missing" });
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: "Bad Request: Crypto key is missing",
      });
    }

    // Here, retrieve or generate your system's expected key.
    const systemKey = getSystemCryptoKey(service as string); //function to get the system's key

    // console.log({systemKey})
    // Compare the provided key with your system's key
    if (clientKey !== systemKey) {
      console.log({ msg: "Invalid crypto key" });
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: false,
        message: "No Access: Invalid crypto key",
      });
    }
    // If the key is valid, proceed to the next middleware
    return next();
  } catch (error) {
    return res.status(StatusCodes.SERVER_ERROR).json({
      status: false,
      error: "Internal Server Error",
    });
  }
};
