import passport from "passport";
import initializeJWT from "./jwt";

const secretOrKey = process.env.PASSPORT_JWT_SECRET || "socialite";

initializeJWT(passport, secretOrKey);

export default passport;
