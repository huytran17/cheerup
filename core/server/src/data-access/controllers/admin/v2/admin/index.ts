import { hashPassword } from "../../../../../config/password";
import {
  batchUploadAdmins,
  getAdmin,
  getAdminByEmail,
  updateAdmin,
} from "../../../../../use-cases/admin";
import makeBatchUploadAdminsController from "./batch-upload-admins";
import makeUploadAvatarController from "./upload-avatar";

const uploadAvatarController = makeUploadAvatarController({
  getAdmin,
  updateAdmin,
});

const batchUploadAdminsController = makeBatchUploadAdminsController({
  batchUploadAdmins,
  hashPassword,
  getAdminByEmail,
});

export default Object.freeze({
  uploadAvatarController,
  batchUploadAdminsController,
});

export { batchUploadAdminsController, uploadAvatarController };
