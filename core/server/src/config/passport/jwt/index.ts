import { Request } from "express";
import { PassportStatic } from "passport";
import password_jwt from "passport-jwt";
import { AdminModel, UserModel } from "../../../data-access/models";
import User from "../../../database/entities/user";
import Admin from "../../../database/entities/admin";

const cookieExtractor = (req: Request) => req.cookies?.access_token;

export default function initializeJWT(
  passport: PassportStatic,
  secretOrKey: string
): PassportStatic {
  const JwtStrategy = password_jwt.Strategy;

  const opts = {
    secretOrKey,
    jwtFromRequest: cookieExtractor,
  };

  passport.use(
    "user-jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const { _id } = jwt_payload;

      const exists = await UserModel.findOne({
        _id,
        deleted_at: { $in: [null, undefined] },
      })
        .select("-__v")
        .lean({ virtuals: true });

      if (!exists) {
        return done(null, null);
      }

      return done(null, new User(exists));
    })
  );

  passport.use(
    "admin-jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const { _id } = jwt_payload;

      const exists = await AdminModel.findOne({
        _id,
        deleted_at: { $in: [null, undefined] },
      })
        .select("-__v")
        .lean({ virtuals: true });

      if (!exists) {
        return done(null, null);
      }

      return done(null, new Admin(exists));
    })
  );

  return passport;
}
