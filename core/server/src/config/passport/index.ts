import passport from "passport";
import initializeJWT from "./jwt";
import initializeGoogle from "./google";

const secretOrKey = process.env.PASSPORT_JWT_SECRET;

initializeJWT(passport, secretOrKey);

initializeGoogle(passport, {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
});

export default passport;
