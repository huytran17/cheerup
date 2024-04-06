import {
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
} from "../../../../../use-cases/system-configuration";
import { logger } from "../../../../../config/logs/logger";

import makeUploadOwnerAvatarController from "./upload-owner-avatar";
import makeUploadFolderIconController from "./upload-folder-icon";
import makeUploadThumbnaiilController from "./upload-thumbnail";

const uploadThumbnaiilController = makeUploadThumbnaiilController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
});

const uploadFolderIconController = makeUploadFolderIconController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
});

const uploadClientAvatarController = makeUploadOwnerAvatarController({
  getLatestSystemConfiguration,
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
