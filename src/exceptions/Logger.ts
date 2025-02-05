// import { createLogger, transports, format } from "winston";
// import fs from "fs";
// import path from "path";
// import DailyRotateFile from "winston-daily-rotate-file";
// // import { ENV, LOG_DIRECTORY } from "../config";

// const ENV = "development"; // check it later
// const LOG_DIRECTORY = "../../logs"; // check it later
// let dir = LOG_DIRECTORY;
// if (!dir) dir = path.join(__dirname, "../../", "logs");
// // console.log(`Log Dir: ${dir}`);
// // create directory if it is not present
// if (!fs.existsSync(dir)) {
//   // Create the directory if it does not exist
//   try {
//     fs.mkdirSync(dir);
//   } catch (e) {
//     console.log(`Unable to create dir ${dir}`, (e as Error).message);
//   }
// }

// const logLevel = ENV === "development" ? "debug" : "warn";

// const dailyRotateFile = new DailyRotateFile({
//   level: logLevel,
//   // @ts-ignore
//   filename: dir + "/%DATE%.log",
//   datePattern: "YYYY-MM-DD",
//   zippedArchive: true,
//   handleExceptions: true,
//   // maxSize: "20m", // 20MB
//   maxFiles: "28d",
//   format: format.combine(
//     format.errors({ stack: true }),
//     format.timestamp(),
//     format.json()
//   ),
// });

// export default createLogger({
//   transports: [
//     new transports.Console({
//       level: logLevel,
//       format: format.combine(
//         format.errors({ stack: true }),
//         format.prettyPrint()
//       ),
//     }),
//     dailyRotateFile,
//   ],
//   exceptionHandlers: [dailyRotateFile],
//   exitOnError: false, // do not exit on handled exceptions
// });
