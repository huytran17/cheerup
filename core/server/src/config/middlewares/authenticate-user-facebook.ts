import passport from "../passport";

export default function authenticateUserFacebook() {
  return passport.authenticate("facebook", { session: false });
}
