import password_jwt from "passport-jwt";
import { PassportStatic } from "passport";
import { UserDb, AdminDb } from "../../../data-access";
import _ from "lodash";

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
      ExtractJwt.fromUrlQueryParameter("t"),
    ]),
  };

  passport.use(
    "user-jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const exist = await UserDb.findByEmail({
        email: jwt_payload.email,
        is_include_deleted: false,
      });

      if (!exist) {
        return done(null, null);
      }

      return done(null, exist);
    })
  );

  passport.use(
    "admin-jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const exist = await AdminDb.findByEmail({
        email: jwt_payload.email,
      });

      if (!exist) {
        return done(null, null);
      }

      return done(null, exist);
    })
  );

  return passport;
}
