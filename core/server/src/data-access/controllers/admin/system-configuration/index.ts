import {
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
} from "../../../../use-cases/system-configuration";
import { logger } from "../../../../config/logs/logger";

import makeGetSystemConfigurationController from "./get-system-configuration";
import makeUpdateSystemConfigurationController from "./update-system-configuration";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";
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

const getLatestSystemConfigurationController =
  makeGetLatestSystemConfigurationController({
    getLatestSystemConfiguration,
  });

const getSystemConfigurationController = makeGetSystemConfigurationController({
  getSystemConfiguration,
});

const updateSystemConfigurationController =
  makeUpdateSystemConfigurationController({
    getSystemConfiguration,
    updateSystemConfiguration,
    logger,
  });

export default Object.freeze({
  getSystemConfigurationController,
  updateSystemConfigurationController,
  getLatestSystemConfigurationController,
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
});

export {
  getSystemConfigurationController,
  updateSystemConfigurationController,
  getLatestSystemConfigurationController,
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
};
