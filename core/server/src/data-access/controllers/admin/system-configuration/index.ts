import { logger } from "../../../../config/logs/logger";
import {
  getLatestSystemConfiguration,
  getSystemConfiguration,
  updateSystemConfiguration,
} from "../../../../use-cases/system-configuration";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";
import makeGetSystemConfigurationController from "./get-system-configuration";
import makeUpdateSystemConfigurationController from "./update-system-configuration";
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
  getLatestSystemConfigurationController,
  getSystemConfigurationController,
  updateSystemConfigurationController,
  uploadClientAvatarController,
  uploadFolderIconController,
  uploadThumbnaiilController,
};
