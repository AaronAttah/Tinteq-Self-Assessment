import { createHmac } from "node:crypto";
import { TINTEQCRYPTOSECRETKEY } from "../config";

export const getSystemCryptoKey = (service: string) => {
  if (service === "Startup") {
    const secret = TINTEQCRYPTOSECRETKEY as string;

    const crypto_key = createHmac("sha512", secret)
      .update("Startup services") //check later what does this update do
      .digest("hex");
    console.log("from sacredeye for startup");

    return crypto_key;
  }

  if (service === "File") {
    const secret = TINTEQCRYPTOSECRETKEY as string;
    const crypto_key = createHmac("sha512", secret)
      .update("File service")
      .digest("hex");

    return crypto_key;
  }
};
