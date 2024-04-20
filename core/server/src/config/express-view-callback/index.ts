import { Request, Response, NextFunction } from "express";

type IController = (httpRequest: any) => any;

export default function makeExpressViewCallback(controller: IController) {
  return (req: Request, res: Response, next: NextFunction) => {
    const httpRequest = {
      context: {
        validated: { ...req.body, ...req.params, ...req.query },
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
        res.type("text/html");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((errorObject: any) => {
        res.status(errorObject.statusCode).send(errorObject.body);
        next(errorObject);
      });
  };
}
