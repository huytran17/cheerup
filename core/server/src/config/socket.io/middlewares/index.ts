import makeVerifyClient from "./verify-client";
import { verifyAccessToken } from "../../accessTokenManager";

const verifyClient = makeVerifyClient({ verifyAccessToken });

export default Object.freeze({
  verifyClient,
});

export { verifyClient };
