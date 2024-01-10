import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import deleteS3Object from "../../utils/delete-s3-object";

type IController = (httpRequest: any) => any;

export default function makeExpressCallback(controller: IController) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      context: {
        validated: merge({}, req.body, req.params, req.query),
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

        const Bucket = <string>get(httpRequest, "context.file.bucket", "");
        const Key = <string>get(httpRequest, "context.file.key", "");

        httpRequest.context.file &&
          deleteS3Object({ bucket: Bucket, key: Key });

        next(errorObject);
      });
  };
}
