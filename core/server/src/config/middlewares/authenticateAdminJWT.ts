import passport from "../passport";

export default function authenticateAdminJWT() {
  return passport.authenticate("admin-jwt", { session: false });
}
