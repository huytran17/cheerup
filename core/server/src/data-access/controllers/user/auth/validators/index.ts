import signInRules from "./sign-in";
import signUpRules from "./sign-up";
import verifyAccessRules from "./verify-access";
import enable2FARules from "./enable-2fa";

export default Object.freeze({
  signInRules,
  signUpRules,
  verifyAccessRules,
  enable2FARules,
});

export { signInRules, signUpRules, verifyAccessRules, enable2FARules };
