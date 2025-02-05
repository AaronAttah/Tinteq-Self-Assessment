import qs from "qs";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestErrorResponse } from "../exceptions";

export class ReqValidator {
  public validateReqBody =
    (schema: Joi.ObjectSchema<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateOptions = {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        };
        if (req.headers["content-type"]?.includes("multipart/form-data")) {
          console.log("form data", req.body);
          req.body = qs.parse(req.body);
          // console.log('form data', req.body);
        }
        const newReqBody = await schema.validateAsync(
          req.body,
          validateOptions
        );
        req.body = newReqBody;
        next();
      } catch (error: any) {
        res
          .status(error?.status || 400)
          .json({ success: false, message: error.message });
      }
    };

  public validateReqParams =
    (
      params: Array<{
        key: string;
        schema: Joi.AnySchema;
        required: boolean;
      }>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        for (const param of params) {
          if (param.required) {
            if (!req.params[param.key]) {
              throw new BadRequestErrorResponse(
                `The following params are required: '${params
                  .map((param) => param.key)
                  .join("', '")}'`
              ).send(res);
            } else {
              const newReqParams = await Joi.object({
                [param.key]: param.schema.required(),
              }).validateAsync({
                [param.key]: req.params[param.key],
              });
            }
          } else {
            if (req.params[param.key]) {
              const newReqParams = await Joi.object({
                [param.key]: param.schema,
              }).validateAsync({
                [param.key]: req.params[param.key],
              });
            }
          }
        }
        next();
      } catch (error: any) {
        res
          .status(error?.status || 400)
          .json({ success: false, message: error.message });
      }
    };

  public validateReqQuery =
    (schema: Joi.ObjectSchema<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateOptions = {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        };
        console.log("req.query: ", req.query);
        const newReqQuery = await schema.validateAsync(
          req.query,
          validateOptions
        );
        req.query = newReqQuery;
        next();
      } catch (error: any) {
        res
          .status(error?.status || 400)
          .json({ success: false, message: error.message });
      }
    };

  public validateReqHeaders =
    (schema: Joi.ObjectSchema<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const validateOptions = {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        };
        const newReqHeaders = await schema.validateAsync(
          req.header,
          validateOptions
        );
        req.header = newReqHeaders;
        next();
      } catch (error: any) {
        res
          .status(error?.status || 400)
          .json({ success: false, message: error.message });
      }
    };

  /**
   *
   * @param filesRequired - To check if, at least, one file is required
   * @param fileKeys - An array of objects containing the following properties:
   *     key: string - The key of the file in the request;
   *     maxSize: number - The maximum size of the file in MB;
   *     minSize?: number - Optional - The minimum size of the file in KB;
   *     mimeTypes: string[] - An array of the expected mimeTypes
   * @returns
   */
  //   public validateReqFiles =
  //     (
  //       filesRequired: boolean, // To check if, at least, one file is required
  //       fileKeys: {
  //         key: string;
  //         type: ERequestFileQuantity;
  //         maxQuantity?: number; // Optional - The maximum number of files expected
  //         maxSize: number; // in MB
  //         minSize?: number; // Optional - in KB
  //         mimeTypes: string[];
  //         required: boolean;
  //       }[]
  //     ) =>
  //     async (req: Request, res: Response, next: NextFunction) => {
  //       try {
  //         if (!filesRequired && !req?.files) {
  //           req.files = {};
  //           next();
  //         } else if (filesRequired && !req.files)
  //           throw new BadRequestErrorResponse(
  //             `The following files are required: '${fileKeys
  //               .filter((fileKey) => fileKey.required)
  //               .map((fileKey) => fileKey.key)
  //               .join("', '")}'`
  //           ).send(res);
  //         else {
  //           if (!req?.files)
  //             throw new BadRequestErrorResponse(
  //               `The following files are required: '${fileKeys
  //                 .filter((fileKey) => fileKey.required)
  //                 .map((fileKey) => fileKey.key)
  //                 .join("', '")}'`
  //             ).send(res);
  //           else if (
  //             (filesRequired && req?.files) ||
  //             (!filesRequired && req?.files)
  //           ) {
  //             const validatedReqFiles: {
  //               [key: string]: any;
  //             } = {};
  //             for (const fileKey of fileKeys) {
  //               let files = req?.files[fileKey.key];
  //               if (fileKey.required && !files) {
  //                 throw new BadRequestErrorResponse(
  //                   `File ${fileKey.key} is missing`
  //                 ).send(res);
  //               }

  //               if (fileKey.type === "single") {
  //                 if (Array.isArray(files)) {
  //                   throw new BadRequestErrorResponse(
  //                     `Multiple files were provided for ${fileKey.key} but only one file is expected`
  //                   ).send(res);
  //                 }
  //                 if (files?.mimetype) {
  //                   if (!fileKey.mimeTypes.includes(files?.mimetype)) {
  //                     throw new BadRequestErrorResponse(
  //                       ` A file with invalid mimeType was provided for ${
  //                         fileKey.key
  //                       }! The expected mimeTypes are: '${fileKey.mimeTypes.join(
  //                         "', '"
  //                       )}'`
  //                     ).send(res);
  //                   }

  //                   const fileSize = files.size;
  //                   if (fileSize > fileKey.maxSize * 1024 * 1024) {
  //                     //Check if file size(in Bytes) is greater than the expected size converted to Bytes
  //                     throw new BadRequestErrorResponse(
  //                       `The file size for ${fileKey.key} is too large; The maximum file size for ${fileKey.key} is ${fileKey.maxSize}MB`
  //                     ).send(res);
  //                   }

  //                   if (fileKey.minSize && fileSize < fileKey.minSize * 1024) {
  //                     //Check if file size(in Bytes) is less than the expected size converted to Bytes
  //                     throw new BadRequestErrorResponse(
  //                       `The file size for ${fileKey.key} is too small; The minimum file size for ${fileKey.key} is ${fileKey.minSize}KB`
  //                     ).send(res);
  //                   }
  //                 }
  //                 validatedReqFiles[fileKey.key] = files;
  //               } else if (fileKey.type === "multiple") {
  //                 if (!Array.isArray(files)) {
  //                   files = [files];
  //                 }
  //                 if (fileKey.maxQuantity && files.length > fileKey.maxQuantity) {
  //                   throw new BadRequestErrorResponse(
  //                     `The maximum number of files for ${fileKey.key} is ${fileKey.maxQuantity}`
  //                   ).send(res);
  //                 }
  //                 const fileKeyFiles: any[] = [];
  //                 for (const file of files) {
  //                   if (file?.mimetype) {
  //                     if (!fileKey.mimeTypes.includes(file?.mimetype)) {
  //                       throw new BadRequestErrorResponse(
  //                         ` A file with invalid mimeType was provided for ${
  //                           fileKey.key
  //                         }! The expected mimeTypes are: '${fileKey.mimeTypes.join(
  //                           "', '"
  //                         )}'`
  //                       ).send(res);
  //                     }

  //                     const fileSize = file.size;
  //                     if (fileSize > fileKey.maxSize * 1024 * 1024) {
  //                       //Check if file size(in Bytes) is greater than the expected size converted to Bytes
  //                       throw new BadRequestErrorResponse(
  //                         `The file size for ${
  //                           files.length > 1
  //                             ? `the file[${files.indexOf(file)}] in ${
  //                                 fileKey.key
  //                               }`
  //                             : fileKey.key
  //                         } is too large; The maximum file size for ${
  //                           fileKey.key
  //                         } is ${fileKey.maxSize}MB`
  //                       ).send(res);
  //                     }

  //                     if (fileKey.minSize && fileSize < fileKey.minSize * 1024) {
  //                       //Check if file size(in Bytes) is less than the expected size converted to Bytes
  //                       console.log(
  //                         `fileSize: ${fileSize}`,
  //                         `fileKey.minSize: ${fileKey.minSize * 1024}`
  //                       );
  //                       console.log("file: ", file);
  //                       throw new BadRequestErrorResponse(
  //                         `The file size for ${
  //                           files.length > 1
  //                             ? `the file[${files.indexOf(file)}] in ${
  //                                 fileKey.key
  //                               }`
  //                             : fileKey.key
  //                         } is too small; The minimum file size for ${
  //                           fileKey.key
  //                         } is ${fileKey.minSize}KB`
  //                       ).send(res);
  //                     }
  //                     fileKeyFiles.push(file);
  //                   }
  //                 }
  //                 validatedReqFiles[fileKey.key] = fileKeyFiles;
  //               }
  //             }
  //             req.files = { ...validatedReqFiles };
  //             console.log("req.files: ", req.files);
  //             console.log("validatedReqFiles: ", validatedReqFiles);
  //             console.log("req.files: ", req.files);
  //             next();
  //           }
  //         }
  //       } catch (error: any) {
  //         res
  //           .status(error?.status || 400)
  //           .json({ success: false, message: error.message });
  //       }
  //     };
}
