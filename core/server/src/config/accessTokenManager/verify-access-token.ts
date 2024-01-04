import { JwtVerify } from "./accessToken";
import { JwtPayload } from "jsonwebtoken";

export type VerifyAccessToken = (
  payload: string,
  options?: object
) => string | JwtPayload;

export default function makeVerifyAccessToken({
  verify,
  secret,
}: {
  verify: JwtVerify;
  secret: string;
}): VerifyAccessToken {
  return function verifyAccessToken(payload, options = {}) {
    return verify(payload, secret, options);
  };
}
