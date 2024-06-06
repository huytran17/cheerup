import {
  getSystemConfiguration,
  updateSystemConfiguration,
} from "../../../../../use-cases/system-configuration";
import makeUploadExcelTemplateController from "./upload-excel-template";
import makeUploadFolderIconController from "./upload-folder-icon";
import makeUploadOwnerAvatarController from "./upload-owner-avatar";
import makeUploadThumbnaiilController from "./upload-thumbnail";

const uploadExcelTemplateController = makeUploadExcelTemplateController({
  getSystemConfiguration,
  updateSystemConfiguration,
});

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
  uploadExcelTemplateController,
});

export {
  uploadClientAvatarController,
  uploadExcelTemplateController,
  uploadFolderIconController,
  uploadThumbnaiilController,
};
