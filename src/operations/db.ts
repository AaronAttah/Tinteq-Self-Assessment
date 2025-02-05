import { disconnect, connect, ConnectOptions, set } from "mongoose";
import { MONGODB_URI } from "../config";
import chalk from "chalk";
import { ENVIRONMENT } from "../config";

const db = MONGODB_URI;

set("strictQuery", false);

const DB_OPTIONS: ConnectOptions = {
  autoIndex: true,
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // @ts-ignore
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName:
    ENVIRONMENT === "staging" || "development"
      ? "TINTEQ-STAGING"
      : "TINTEQ-PRODUCTION",
};

export = (
  DB: string = db!,
  options: ConnectOptions = DB_OPTIONS
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const mongo = await connect(DB, options);
      console.log(
        `${chalk.italic.yellow("TINTEQ Db Connection")}: ${chalk.bold.green(
          "Successful"
        )}`
      );
      resolve(mongo.connection.getClient());
    } catch (error) {
      console.log(`${chalk.red(error)}`);

      reject(error);
    }
  });
};
