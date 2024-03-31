import { getUser, updateUser } from "../../../../../use-cases/user";
import makeUploadUserAvatarController from "./upload-avatar";

const uploadUserAvatarController = makeUploadUserAvatarController({
  getUser,
  updateUser,
});

export default Object.freeze({
  uploadUserAvatarController,
});

export { uploadUserAvatarController };
