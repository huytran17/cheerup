import {
  getGallery,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleriesPaginated,
} from "../../../../use-cases/gallery";
import { logger } from "../../../../config/logs/logger";

import makeDeleteGalleryItemController from "./delete-gallery-item";
import makeHardDeleteGalleryController from "./hard-delete-gallery";
import makeGetGalleriesPaginatedController from "./get-galleries-paginated";
import makeUploadGalleryItemController from "./upload-gallery-item";
import makeGetGalleryController from "./get-gallery";
import makeCreateGalleryController from "./create-gallery";

const createGalleryController = makeCreateGalleryController({
  createGallery,
  logger,
});

const hardDeleteGalleryController = makeHardDeleteGalleryController({
  getGallery,
  hardDeleteGallery,
  logger,
});

const uploadGalleryItemController = makeUploadGalleryItemController({
  getGallery,
  updateGallery,
  logger,
});

const getGalleriesPaginatedController = makeGetGalleriesPaginatedController({
  getGalleriesPaginated,
  logger,
});

const getGalleryController = makeGetGalleryController({
  getGallery,
  logger,
});

const deleteGalleryItemController = makeDeleteGalleryItemController({
  getGallery,
  updateGallery,
  logger,
});

export default Object.freeze({
  deleteGalleryItemController,
  getGalleryController,
  getGalleriesPaginatedController,
  uploadGalleryItemController,
  hardDeleteGalleryController,
  createGalleryController,
});

export {
  deleteGalleryItemController,
  getGalleryController,
  getGalleriesPaginatedController,
  uploadGalleryItemController,
  hardDeleteGalleryController,
  createGalleryController,
};
