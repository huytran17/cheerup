import {
  getSystemConfiguration,
  updateSystemConfiguration,
  getLatestSystemConfiguration,
} from "../../../../use-cases/system-configuration";
import { logger } from "../../../../config/logs/logger";

import makeGetSystemConfigurationController from "./get-system-configuration";
import makeUpdateSystemConfigurationController from "./update-system-configuration";
import makeGetLatestSystemConfigurationController from "./get-latest-system-configuration";
import makeUploadAdminMetaFaviconController from "./upload-admin-meta-favicon";
import makeUploadAdminMetaLogoController from "./upload-admin-meta-logo";
import makeUploadClientMetaFaviconController from "./upload-client-meta-favicon";
import makeUploadClientMetaLogoController from "./upload-client-meta-logo";
import makeUploadClientMetaOwnerAvatarController from "./upload-client-meta-owner-avatar";
import makeUploadAdminMetaFolderIconController from "./upload-admin-meta-folder-icon";

const uploadAdminMetaFolderIconController =
  makeUploadAdminMetaFolderIconController({
    getLatestSystemConfiguration,
    updateSystemConfiguration,
  });

const uploadClientMetaOwnerAvatarController =
  makeUploadClientMetaOwnerAvatarController({
    getLatestSystemConfiguration,
    updateSystemConfiguration,
  });

const uploadAdminMetaFaviconController = makeUploadAdminMetaFaviconController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
});

const uploadAdminMetaLogoController = makeUploadAdminMetaLogoController({
  getLatestSystemConfiguration,
  updateSystemConfiguration,
});

const uploadClientMetaFaviconController = makeUploadClientMetaFaviconController(
  {
    getLatestSystemConfiguration,
    updateSystemConfiguration,
  }
);

const uploadClientMetaLogoController = makeUploadClientMetaLogoController({
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
  uploadAdminMetaFaviconController,
  uploadAdminMetaLogoController,
  uploadClientMetaFaviconController,
  uploadClientMetaLogoController,
  uploadClientMetaOwnerAvatarController,
  uploadAdminMetaFolderIconController,
});

export {
  getSystemConfigurationController,
  updateSystemConfigurationController,
  getLatestSystemConfigurationController,
  uploadAdminMetaFaviconController,
  uploadAdminMetaLogoController,
  uploadClientMetaFaviconController,
  uploadClientMetaLogoController,
  uploadClientMetaOwnerAvatarController,
  uploadAdminMetaFolderIconController,
};
