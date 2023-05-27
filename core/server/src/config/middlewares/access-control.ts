import { Request, Response, NextFunction } from "express";
import { get, includes } from "lodash";

export default function accessControlMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const origin = getAccessControlOrigin(req);

  res.setHeader("Access-Control-Allow-Origin", origin);

  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
}

function getAccessControlOrigin(req: Request): string {
  const allowedOrigins = [
    process.env.USER_DASHBOARD_URL,
    process.env.ADMIN_DASHBOARD_URL,
  ];

  const origin = get(req, "headers.origin");
  const is_allowed = includes(allowedOrigins, origin);

  return is_allowed ? origin : "";
}
