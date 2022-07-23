import makeSignUp from "./sign-up";
import { UserDb } from "../../data-access";

const signUp = makeSignUp({
  userDb: UserDb,
});

export default Object.freeze({
  signUp,
});

export { signUp };
