import {
  getGallery,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleriesPaginated,
  getGalleriesByParent,
} from "../../../../use-cases/gallery";
import { logger } from "../../../../config/logs/logger";

import makeDeleteGalleryItemController from "./delete-gallery-item";
import makeHardDeleteGalleryController from "./hard-delete-gallery";
import makeGetGalleriesPaginatedController from "./get-galleries-paginated";
import makeUploadGalleryItemController from "./upload-gallery-item";
import makeGetGalleryController from "./get-gallery";
import makeCreateGalleryController from "./create-gallery";
import makeGetGalleriesByParentController from "./get-galleries-by-parent";
import makeUpdateGalleryController from "./update-gallery";

const updateGalleryController = makeUpdateGalleryController({
  getGallery,
  updateGallery,
  logger,
});

const getGalleriesByParentController = makeGetGalleriesByParentController({
  getGallery,
  getGalleriesByParent,
});

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
});

const getGalleryController = makeGetGalleryController({
  getGallery,
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
  getGalleriesByParentController,
  updateGalleryController,
});

export {
  deleteGalleryItemController,
  getGalleryController,
  getGalleriesPaginatedController,
  uploadGalleryItemController,
  hardDeleteGalleryController,
  createGalleryController,
  getGalleriesByParentController,
  updateGalleryController,
};
