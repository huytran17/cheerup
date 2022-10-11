import passport from "../passport";

export default function authenticateUserGoogle() {
  return passport.authenticate("google", { session: false });
}
