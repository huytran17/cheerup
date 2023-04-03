import { PasswordResetDb } from "../../data-access";
import makeGetPasswordResetByEmailAndCode from "./get-password-reset-by-email-and-code";
import makeCreateGallery from "./create-password-reset";
import makeHardDeleteGallery from "./hard-delete-password-reset";

const hardDeleteGallery = makeHardDeleteGallery({
  passwordResetDb: PasswordResetDb,
});

const getPasswordResetByEmailAndCode = makeGetPasswordResetByEmailAndCode({
  passwordResetDb: PasswordResetDb,
});

const createGallery = makeCreateGallery({
  passwordResetDb: PasswordResetDb,
});

const passwordResetServices = Object.freeze({
  getPasswordResetByEmailAndCode,
  createGallery,
  hardDeleteGallery,
});

export default passwordResetServices;

export { getPasswordResetByEmailAndCode, createGallery, hardDeleteGallery };
