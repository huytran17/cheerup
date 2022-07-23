import { IJwtVerify } from "./accessToken";
import { JwtPayload } from "jsonwebtoken";

export type IVerifyAccessToken = (
  payload: string,
  options?: object
) => Promise<string> | JwtPayload;

export default function makeVerifyAccessToken({
  verify,
  secret,
}: {
  verify: IJwtVerify;
  secret: string;
}): IVerifyAccessToken {
  return async function verifyAccessToken(payload: string, options?: object) {
    const decoded = await verify(payload, secret, options);
    return decoded;
  };
}
