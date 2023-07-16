import { TwoFactorAuthenticationDb } from "../../data-access";
import makeGetTwoFactorAuthenticationByCode from "./get-two-factor-authentication-by-code";
import makeCreateTwoFactorAuthentication from "./create-two-factor-authentication";
import makeHardDeleteTwoFactorAuthentication from "./hard-delete-two-factor-authentication";
import makeGetTwoFactorAuthenticationByEmailAndCode from "./get-two-factor-authentication-by-email-and-code";
import makeGetTwoFactorAuthenticationByEmail from "./get-two-factor-authentication-by-email";

const getTwoFactorAuthenticationByEmail = makeGetTwoFactorAuthenticationByEmail(
  {
    twoFactorAuthenticationDb: TwoFactorAuthenticationDb,
  }
);

const getTwoFactorAuthenticationByEmailAndCode =
  makeGetTwoFactorAuthenticationByEmailAndCode({
    twoFactorAuthenticationDb: TwoFactorAuthenticationDb,
  });

const hardDeleteTwoFactorAuthentication = makeHardDeleteTwoFactorAuthentication(
  {
    twoFactorAuthenticationDb: TwoFactorAuthenticationDb,
  }
);

const getTwoFactorAuthenticationByCode = makeGetTwoFactorAuthenticationByCode({
  twoFactorAuthenticationDb: TwoFactorAuthenticationDb,
});

const createTwoFactorAuthentication = makeCreateTwoFactorAuthentication({
  twoFactorAuthenticationDb: TwoFactorAuthenticationDb,
});

const twoFactorAuthenticationServices = Object.freeze({
  getTwoFactorAuthenticationByCode,
  createTwoFactorAuthentication,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getTwoFactorAuthenticationByEmail,
});

export default twoFactorAuthenticationServices;

export {
  getTwoFactorAuthenticationByCode,
  createTwoFactorAuthentication,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
  getTwoFactorAuthenticationByEmail,
};
