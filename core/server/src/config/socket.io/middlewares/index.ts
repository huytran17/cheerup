import makeVerifyClient from "./verify-client";
import { verifyAccessToken } from "../../access-token-manager";

const verifyClient = makeVerifyClient({ verifyAccessToken });

export default Object.freeze({
  verifyClient,
});

export { verifyClient };
