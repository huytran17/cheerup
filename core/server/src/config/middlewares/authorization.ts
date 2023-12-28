import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import IAdmin from "../../database/interfaces/admin";
import { HttpStatusCode } from "../../constants/http-status-code";

export default function makeAuthorizationMiddleware(roles: string[]) {
  return function authorizationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const admin = <IAdmin>get(req, "user");
    const access_allowed = roles.includes(admin.type);

    const has_no_roles = roles.length === 0;
    const is_allowed = access_allowed || has_no_roles;

    if (is_allowed) {
      return next();
    }

    res.set({
      "content-type": "application/json",
    });
    res.type("json");

    return res
      .status(HttpStatusCode.FORBIDDEN)
      .send({ status: HttpStatusCode.FORBIDDEN, message: "Access Denied" });
  };
}
