import { JwtVerify } from "./access-token";
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
