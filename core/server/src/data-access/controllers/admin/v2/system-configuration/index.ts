import {
  getSystemConfiguration,
  updateSystemConfiguration,
} from "../../../../../use-cases/system-configuration";
import makeUploadFolderIconController from "./upload-folder-icon";
import makeUploadOwnerAvatarController from "./upload-owner-avatar";
import makeUploadThumbnaiilController from "./upload-thumbnail";

const uploadThumbnaiilController = makeUploadThumbnaiilController({
  getSystemConfiguration,
  updateSystemConfiguration,
});

const uploadFolderIconController = makeUploadFolderIconController({
  getSystemConfiguration,
  updateSystemConfiguration,
});

const uploadClientAvatarController = makeUploadOwnerAvatarController({
  getSystemConfiguration,
  updateSystemConfiguration,
});

export default Object.freeze({
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
});

export {
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
};
