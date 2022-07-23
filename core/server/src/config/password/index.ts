import makeHashPassword from "./hash-password";
import makeHash from "./hash-password/make-hash";
import makeVerifyPassword from "./verify-password";
import makeCompareHash from "./verify-password/make-compare";

const hashPassword = makeHashPassword(makeHash());
const verifyPassword = makeVerifyPassword(makeCompareHash());

const passwordServices = Object.freeze({ hashPassword, verifyPassword });

export default passwordServices;
export { hashPassword, verifyPassword };
