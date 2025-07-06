import { Request } from "express";
import { PassportStatic } from "passport";
import passport_google_oauth2, {
  StrategyOptionsWithRequest,
  VerifyCallback,
} from "passport-google-oauth2";
import { UserModel } from "../../../data-access/models";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../email-manager";
import { hashPassword } from "../../password";
import { randomString } from "../../randomstring";

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
      const email = profile.email;
      const full_name = profile.displayName;

      const exist = await UserModel.findOne({
        email,
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

      const random_password = randomString({
        length: 12,
        charset: "alphanumeric",
      });

      const hashed_password = await hashPassword({
        password: random_password,
        password_confirmation: random_password,
      });

      const user_details = {
        email,
        full_name,
        avatar_url: profile.picture,
        hash_password: hashed_password,
        socialite: {
          provider: "google",
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };

      const created_user = await UserModel.create(user_details);

      const email_content = await getEmailContent({
        to: email,
        type: "signed-in-with-google",
      });

      const rendered_email_content = await renderEmailContent({
        email_content,
        user_template_data: {
          full_name,
          password: hashed_password,
        },
      });

      await sendEmail(rendered_email_content);

      return done(null, created_user);
    })
  );

  return passport;
}
