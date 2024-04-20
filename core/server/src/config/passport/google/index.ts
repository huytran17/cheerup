import { Request } from "express";
import passport_google_oauth2, {
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth2";
import { PassportStatic } from "passport";
import { UserModel } from "../../../data-access/models";

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
      const exist = await UserModel.findOne({
        email: profile.email,
      })
        .select("-__v")
        .lean({ virtuals: true });

      const deleted_user = exist && exist.deleted_at;
      if (deleted_user) {
        return done(null, null);
      }

      if (exist) {
        return done(null, exist);
      }

      const user_details = {
        email: profile.email,
        full_name: profile.displayName,
        avatar_url: profile.picture,
        socialite: {
          provider: "google",
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };

      const created_user = await UserModel.create(user_details);

      return done(null, created_user);
    })
  );

  return passport;
}
