import passport_fb, { StrategyOptionWithRequest } from "passport-facebook";
import { PassportStatic } from "passport";

export default function initializeFacebook(
  passport: PassportStatic,
  options: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }
): PassportStatic {
  const FacebookStrategy = passport_fb.Strategy;

  const opts: StrategyOptionWithRequest = {
    ...options,
    authType: "reauthenticate",
    scope: ["user_friends", "manage_pages"],
    profileFields: ["id", "displayName", "photos", "email"],
    passReqToCallback: true,
  };

  passport.use(
    "facebook",
    new FacebookStrategy(opts, async function (
      accessToken,
      refreshToken,
      profile,
      cb
    ) {})
  );

  return passport;
}
