import jwt from "jsonwebtoken";

type JwtGenerate = (
  payload: { [key: string]: any },
  secret: string,
  options?: { expiresIn: string | number }
) => string;

type JwtVerify = (
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
export { JwtGenerate, JwtVerify };
