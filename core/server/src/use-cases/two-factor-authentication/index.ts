import { TwoFactorAuthenticationDb } from "../../data-access";
import makeGetTwoFactorAuthenticationByCode from "./get-two-factor-authentication-by-code";
import makeCreateTwoFactorAuthentication from "./create-two-factor-authentication";
import makeHardDeleteTwoFactorAuthentication from "./hard-delete-two-factor-authentication";
import makeGetTwoFactorAuthenticationByEmailAndCode from "./get-two-factor-authentication-by-email-and-code";

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
});

export default twoFactorAuthenticationServices;

export {
  getTwoFactorAuthenticationByCode,
  createTwoFactorAuthentication,
  hardDeleteTwoFactorAuthentication,
  getTwoFactorAuthenticationByEmailAndCode,
};
