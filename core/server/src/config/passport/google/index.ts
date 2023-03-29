import { Request } from "express";
import passport_google_oauth2, {
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth2";
import { PassportStatic } from "passport";
import { UserDb } from "../../../data-access";
import { hashPassword } from "../../password";
import randomString from "randomstring";

export default function initializeGoogle(
  passport: PassportStatic,
  options: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }
): PassportStatic {
  const GoogleStrategy = passport_google_oauth2.Strategy;

  const opts: StrategyOptionsWithRequest = {
    ...options,
    scope: ["email", "profile"],
    passReqToCallback: true,
  };

  passport.use(
    "google",
    new GoogleStrategy(opts, async function (
      req: Request,
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) {
      const exist = await UserDb.findByEmail({
        email: profile.emails[0].value,
      });

      if (exist.deleted_at) {
        return done(null, null);
      }

      if (exist) {
        return done(null, exist);
      }

      const random_password = randomString.generate();
      const hashed_password = await hashPassword({
        password: random_password,
        password_confirmation: random_password,
      });

      const userDetails = {
        email: profile.emails[0]?.value,
        full_name: profile.displayName,
        hash_password: hashed_password,
      };

      const created_user = await UserDb.insert(userDetails);

      return done(null, created_user);
    })
  );

  return passport;
}
