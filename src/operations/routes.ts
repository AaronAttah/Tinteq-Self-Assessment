import express, { Request, Response, Application, NextFunction } from "express";
import { authRouter, startupRouter, shipmentRouter } from "../routes";
import { pageNotFound, errorHandler, logRequest } from "../middleware";
import { VERSION } from "../config/";

export = function (app: Application) {
  // set cors
  app.use((req: Request, res: Response, next: NextFunction): any => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, GET, PATCH, DELETE");
      return res.status(200).json({});
    }

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(logRequest);

  app.use(`${VERSION}/auths`, authRouter);
  app.use(`${VERSION}/startups/`, startupRouter);
  app.use(`${VERSION}/shipments/`, shipmentRouter);

  /**APP CHECK */
  app.get("/", (req: Request, res: Response) => {
    res.json({
      status: true,
      info: "Tentiq is up and running, to begin to access the endpoints, append the version to the baseURl followed by the params 👍",
      test: "api/v1",
    });
  });
  app.get(`${VERSION}`, (req: Request, res: Response) => {
    res.json({ status: true, message: "Tentiq-V1 health check passed ✅" });
  });

  // Catch 404 and forward to error handler
  app.use("*", pageNotFound());

  // Error handler
  app.use(errorHandler);
};
