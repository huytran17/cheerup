import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import Storage from "../storage";

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
        httpResponse.headers && res.set(httpResponse.headers);
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((errorObject: any) => {
        res.status(errorObject.statusCode).send(errorObject.body);

        const Bucket: string = _.get(httpRequest, "context.file.bucket");
        const Key: string = _.get(httpRequest, "context.file.key");
        if (httpRequest.context.file) {
          const s3 = Storage.getS3();
          const params = {
            Bucket,
            Key,
          };

          s3.deleteObject(params, (error, data) =>
            error ? console.log(error, error.stack) : console.log(data)
          );
        }

        next(errorObject);
      });
  };
}
