import { Request } from "express";
import { PassportStatic } from "passport";
import password_jwt from "passport-jwt";
import { AdminModel, UserModel } from "../../../data-access/models";

const extractAccessTokenFromRequest = (req: Request) =>
  req.cookies?.access_token || "";

export default function initializeJWT(
  passport: PassportStatic,
  secretOrKey: string
): PassportStatic {
  const JwtStrategy = password_jwt.Strategy;

  const opts = {
    secretOrKey,
    jwtFromRequest: extractAccessTokenFromRequest,
  };

  passport.use(
    "user-jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const exists = await UserModel.findOne({
        email: jwt_payload.email,
        hash_password: jwt_payload.hash_password,
        deleted_at: { $in: [null, undefined] },
      });

      if (!exists) {
        return done(null, null);
      }

      return done(null, exists);
    })
  );

  passport.use(
    "admin-jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const exists = await AdminModel.findOne({
        email: jwt_payload.email,
        hash_password: jwt_payload.hash_password,
        deleted_at: { $in: [null, undefined] },
      });

      if (!exists) {
        return done(null, null);
      }

      return done(null, exists);
    })
  );

  return passport;
}
