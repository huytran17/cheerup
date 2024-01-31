import { Request, Response, NextFunction } from "express";
import { merge } from "lodash";
// import deleteS3Object from "../../utils/delete-s3-object";

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
      cookies: req.cookies,
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

        const body = httpResponse.body || {};
        const body_data = body.data || {};
        const {
          sign_out,
          sign_in,
          access_token,
          is_verifying_reset_pwd,
          is_verified_reset_pwd,
          verification_token,
        } = body_data;

        if (sign_out) {
          res.clearCookie("access_token", { path: "/" });

          delete body.data.sign_out;
        }

        if (sign_in) {
          const one_year_in_ms = 365 * 24 * 60 * 60 * 1000;

          res.cookie("access_token", access_token, {
            path: "/",
            httpOnly: true,
            maxAge: one_year_in_ms,
          });

          delete body.data.sign_in;
          delete body.data.access_token;
        }

        if (is_verifying_reset_pwd) {
          const fifteen_minute_in_ms = 15 * 60 * 1000;

          res.cookie("verification_token", verification_token, {
            path: "/",
            httpOnly: true,
            maxAge: fifteen_minute_in_ms,
          });

          delete body.data.is_verifying_reset_pwd;
          delete body.data.verification_token;
        }

        if (is_verified_reset_pwd) {
          res.clearCookie("verification_token", { path: "/" });

          delete body.data.is_verified_reset_pwd;
        }

        res.status(httpResponse.statusCode).send(body);
      })
      .catch((errorObject: any) => {
        res.status(errorObject.statusCode).send(errorObject.body);

        // const Bucket = <string>get(httpRequest, "context.file.bucket", "");
        // const Key = <string>get(httpRequest, "context.file.key", "");

        // httpRequest.context.file &&
        //   deleteS3Object({ bucket: Bucket, key: Key });

        next(JSON.stringify(errorObject));
      });
  };
}
