import passport_fb, {
  StrategyOptionsWithRequest,
} from "passport-google-oauth2";
import { PassportStatic } from "passport";

export default function initializeGoogle(
  passport: PassportStatic,
  options: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }
): PassportStatic {
  const FacebookStrategy = passport_fb.Strategy;

  const opts: StrategyOptionsWithRequest = {
    ...options,
    scope: ["email", "profile"],
    successRedirect: "/api/auth/google/success",
    failureRedirect: "/api/auth/google/failure",
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
