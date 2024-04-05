import { getAdmin, updateAdmin } from "../../../../../use-cases/admin";

import makeUploadAvatarController from "./upload-avatar";

const uploadAvatarController = makeUploadAvatarController({
  getAdmin,
  updateAdmin,
});

export default Object.freeze({
  uploadAvatarController,
});

export { uploadAvatarController };
