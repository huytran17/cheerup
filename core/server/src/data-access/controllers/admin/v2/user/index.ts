import { excelToJSON } from "../../../../../config/excel-to-json";
import { hashPassword } from "../../../../../config/password";
import {
  batchUploadUsers,
  getUser,
  getUserByEmail,
  updateUser,
} from "../../../../../use-cases/user";
import makeBatchUploadUsersController from "./batch-upload-users";
import makeUploadUserAvatarController from "./upload-avatar";

const batchUploadUsersController = makeBatchUploadUsersController({
  hashPassword,
  getUserByEmail,
  batchUploadUsers,
  excelToJSON,
});

const uploadUserAvatarController = makeUploadUserAvatarController({
  getUser,
  updateUser,
});

export default Object.freeze({
  uploadUserAvatarController,
  batchUploadUsersController,
});

export { batchUploadUsersController, uploadUserAvatarController };
