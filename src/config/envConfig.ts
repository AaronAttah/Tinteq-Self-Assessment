import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 6001
export const MONGODB_URI = process.env.MONGODB_URI;
export const VERSION = process.env.VERSION;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const SERVICE = process.env.SERVICE;
export const PASSMAILER = process.env.PASSMAILER;
export const MAIL_FROM = process.env.MAIL_FROM;
export const JWT_SECRET = process.env.JWT_SECRET;

export const LOG_LEVEL = process.env.LOG_LEVEL;
export const TINTEQCRYPTOSECRETKEY = process.env.TINTEQCRYPTOSECRETKEY
export const ADMINACCESS = process.env.ADMINACCESS
export const SHIPPERACCESS = process.env.SHIPPERACCESS
export const CARRIERACCESS = process.env.CARRIERACCESS


