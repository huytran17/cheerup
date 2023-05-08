import { Request } from "express";
import passport_google_oauth2, {
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth2";
import { PassportStatic } from "passport";
import { UserDb } from "../../../data-access";

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
        email: profile.email,
      });

      const deleted_user = exist && exist.deleted_at;
      if (deleted_user) {
        return done(null, null);
      }

      if (exist) {
        return done(null, exist);
      }

      const userDetails = {
        email: profile.email,
        full_name: profile.displayName,
        avatar_url: profile.picture,
        socialite: {
          provider: "google",
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };

      const created_user = await UserDb.insert(userDetails);

      return done(null, created_user);
    })
  );

  return passport;
}
