import Joi from "joi";
import { isObjectId } from "../utils";

export class AuthReqSchema {
  /*OTP-AUTH SCHEMA */

  /* REGISTER-AUTH SCHEMA */
  public registerBody() {
    return Joi.object({
      // BASIC INFORMATION

      full_name: Joi.string().required().messages({
        "any.required": "full_name is required.",
      }),

      email: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .messages({
          "any.required": "Email address is required.",
          "string.pattern.base": "You must provide a valid email address.",
        }),

      password: Joi.string()
        .required()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
        )
        .messages({
          "any.required": "Password is required",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }),

      role: Joi.string().required().messages({
        "any.required": "user role is required.",
      }),
    });
  }

  /* LOGIN-AUTH SCHEMA */
  public loginBody() {
    return Joi.object({
      // BASIC INFORMATION

      email: Joi.string().email().required().messages({
        "any.required":
          "Email address is required, and  You must provide a valid email address",
      }),

      password: Joi.string().required().messages({
        "any.required": "Password is required",
      }),
    });
  }

  public shipmentBody() {
    return Joi.object({
      // BASIC INFORMATION

      test1: Joi.string().optional().allow("").messages({
        "any.required": "test1 is required",
      }),

      test2: Joi.string().optional().allow("").messages({
        "any.required": "test2 is required",
      }),
    });
  }
}
