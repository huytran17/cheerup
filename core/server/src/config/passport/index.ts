import passport from "passport";
import initializeJWT from "./jwt";
import initializeFacebook from "./facebook";
import initializeGoogle from "./google";

const secretOrKey = process.env.PASSPORT_JWT_SECRET || "blog";

initializeJWT(passport, secretOrKey);

initializeFacebook(passport, {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
});

initializeGoogle(passport, {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
});

export default passport;
