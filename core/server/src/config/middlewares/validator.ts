import { Request, Response, NextFunction } from "express";
import _ from "lodash";

import Validator, { Rules } from "validatorjs";
import { HttpStatusCode } from "../../constants/http-status-code";

export default function makeValidator(rules: Rules) {
  return async function validatorMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = _.get(req, "user");
    const body = _.get(req, "body");
    const params = _.get(req, "params");
    const query = _.get(req, "query");

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
