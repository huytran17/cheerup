import randomString from "randomstring";
import passport_facebook, {
  StrategyOptionWithRequest,
} from "passport-facebook";
import { PassportStatic } from "passport";
import { UserDb } from "../../../data-access";
import { hashPassword } from "../../password";

export default function initializeFacebook(
  passport: PassportStatic,
  options: {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
  }
): PassportStatic {
  const FacebookStrategy = passport_facebook.Strategy;

  const opts: StrategyOptionWithRequest = {
    ...options,
    authType: "reauthenticate",
    profileFields: ["id", "displayName", "photos", "email"],
    passReqToCallback: true,
    enableProof: true,
  };

  passport.use(
    "facebook",
    new FacebookStrategy(opts, async function (
      req,
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      const exist = await UserDb.findByEmail({
        email: profile.emails[0]?.value,
      });

      const deleted_user = exist && exist.deleted_at;
      if (deleted_user) {
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
        email: profile.emails[0].value,
        full_name: profile.displayName,
        hash_password: hashed_password,
      };

      const created_user = await UserDb.insert(userDetails);

      return done(null, created_user);
    })
  );

  return passport;
}
