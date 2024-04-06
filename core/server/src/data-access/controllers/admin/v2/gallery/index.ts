import { getGallery, updateGallery } from "../../../../../use-cases/gallery";
import { logger } from "../../../../../config/logs/logger";

import makeUploadGalleryItemController from "./upload-gallery-item";
import makeDeleteGalleryItemController from "./delete-gallery-item";

const uploadGalleryItemController = makeUploadGalleryItemController({
  getGallery,
  updateGallery,
  logger,
});

const deleteGalleryItemController = makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
});

export default Object.freeze({
  uploadGalleryItemController,
  deleteGalleryItemController,
});

export { uploadGalleryItemController, deleteGalleryItemController };
