import password_jwt from "passport-jwt";
import { PassportStatic } from "passport";
import { UserModel, AdminModel } from "../../../data-access/models";

export default function initializeJWT(
  passport: PassportStatic,
  secretOrKey: string
): PassportStatic {
  const JwtStrategy = password_jwt.Strategy,
    ExtractJwt = password_jwt.ExtractJwt;

  const opts = {
    secretOrKey,
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
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
