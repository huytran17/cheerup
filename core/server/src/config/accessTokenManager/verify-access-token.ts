import { IJwtVerify } from "./accessToken";
import { JwtPayload } from "jsonwebtoken";

export type IVerifyAccessToken = (
  payload: string,
  options?: object
) => string | JwtPayload;

export default function makeVerifyAccessToken({
  verify,
  secret,
}: {
  verify: IJwtVerify;
  secret: string;
}): IVerifyAccessToken {
  return function verifyAccessToken(payload: string, options?: object) {
    const decoded = verify(payload, secret, options);
    return decoded;
  };
}
