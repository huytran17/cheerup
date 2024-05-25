import { NextFunction, Request, Response } from "express";
import { VerifyAccessToken } from "../../accessTokenManager/verify-access-token";

export default function makeVerifyClient({
  verifyAccessToken,
}: {
  verifyAccessToken: VerifyAccessToken;
}) {
  return async function verifyClient(
    req: Request & { _query: { sid: string | undefined } },
    res: Response,
    next: NextFunction
  ) {
    try {
      const isHandshake = req._query.sid === undefined;
      if (!isHandshake) {
        return next();
      }

      const access_token = req.cookies?.access_token;
      verifyAccessToken(access_token);

      next();
    } catch (error) {
      console.error(error);
      next(new Error(error));
    }
  };
}
