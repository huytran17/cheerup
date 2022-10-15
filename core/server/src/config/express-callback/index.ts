import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import Storage from "../storage";

// FIXME: fix all the any
type IController = (httpRequest: any) => any;
export default function makeExpressCallback(controller: IController) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      context: {
        validated: Object.assign({}, req.body, req.params, req.query),
        user: req.user,
        file: req.file,
        ip: req.clientIp,
      },
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };
    controller(httpRequest)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((errorObject: any) => {
        res.status(errorObject.statusCode).send(errorObject.body);

        const Bucket: string = _.get(httpRequest, "context.file.meta.bucket");
        const Key: string = _.get(httpRequest, "context.file.meta.key");
        if (httpRequest.context.file) {
          // A file upload was executed but an error occurred. An S3 revert is required.
          const s3 = Storage.getS3();
          const params = {
            Bucket,
            Key,
          };
          s3.deleteObject(params, function (err, data) {
            if (err) {
              console.log(err, err.stack);
            } // an error occurred
            else {
              console.log(data);
            } // successful response
          });
        }

        next(errorObject);
      });
  };
}
