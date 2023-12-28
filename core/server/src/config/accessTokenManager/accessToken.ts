import jwt from "jsonwebtoken";

type IJwtGenerate = (
  payload: { [key: string]: any },
  secret: string,
  options?: { expiresIn: string | number }
) => string;

type IJwtVerify = (
  payload: string,
  secret: string,
  options?: object
) => string | jwt.JwtPayload;

export default Object.freeze({
  generate: (
    payload: {
      [key: string]: any;
    },
    secret: string,
    options = {}
  ) => {
    return jwt.sign(payload, secret, options);
  },
  verify: (payload: string, secret: string, options = {}) => {
    return jwt.verify(payload, secret, options);
  },
});
export { IJwtGenerate, IJwtVerify };
