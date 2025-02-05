import express from "express";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";

import { Application } from "express";
import _ from "lodash";
import cors from "cors";
import chalk from "chalk";

import { ENVIRONMENT, PORT } from "./config";
// import { createHmac } from "node:crypto";
// import { TINTEQCRYPTOSECRETKEY } from "./config";


const app: Application = express();
dotenv.config(); 

app.use(morgan("dev"));
app.use(cors());
app.use(compression({})); 




/**ROUTES */
import routes from "./operations/routes";
import db from "./operations/db";

db();
routes(app);
// logger();

// const secret = TINTEQCRYPTOSECRETKEY as string;

//    const crypto_key = createHmac("sha512", secret)
//       .update("Startup services") //check later what does this update do
//       .digest("hex");
//     console.log(crypto_key);



app
  .listen(PORT, () => {
    console.log("TINTEQ Auth-&-RBAC app listening on port " + PORT);
  })

  .on("listening", () => {
    console.log(`${chalk.italic.yellow("Anatomy:")}`);
    console.log(
      `${chalk.bold.green("Environment: ")}  ${chalk.italic.bold.yellow(
        `(${ENVIRONMENT})`
      )}`
    );
    console.log(`${chalk.bold.green("Port: ")} ${chalk.blue(PORT)}`);
  })
  .on("error", (err) => {
    console.log(err);
    console.log(`${chalk.red("Error starting server, exiting process")}`);
    process.exit(1);
  })
  .on("close", () => {
    console.log(`${chalk.red("Connection closed")}`);
  });
