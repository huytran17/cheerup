import { Request, Response, NextFunction } from "express";
import { get } from "lodash";

import Validator, { Rules } from "validatorjs";
import { HttpStatusCode } from "../../constants/http-status-code";

export default function makeValidatorMiddleware(rules: Rules) {
  return async function validatorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = get(req, "user");
    const body = get(req, "body");
    const params = get(req, "params");
    const query = get(req, "query");

    const request_body = Object.assign({}, user, body, params, query);
    const validation = new Validator(request_body, rules);
    const passed = validation.passes();
    if (passed) {
      return next();
    }

    res.set({
      "Content-Type": "application/json",
    });
    res.type("json");
    return res.status(HttpStatusCode.BAD_REQUEST).send(validation.errors);
  };
}
