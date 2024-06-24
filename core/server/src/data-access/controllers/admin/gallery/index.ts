import { logger } from "../../../../config/logs/logger";
import {
  createGallery,
  getGalleriesByParent,
  getGalleriesPaginated,
  getGallery,
  hardDeleteGallery,
  updateGallery,
} from "../../../../use-cases/gallery";
import makeCreateGalleryController from "./create-gallery";
import makeDeleteGalleryItemController from "./delete-gallery-item";
import makeGetGalleriesByParentController from "./get-galleries-by-parent";
import makeGetGalleriesPaginatedController from "./get-galleries-paginated";
import makeGetGalleryController from "./get-gallery";
import makeHardDeleteGalleryController from "./hard-delete-gallery";
import makeUpdateGalleryController from "./update-gallery";
import makeUploadGalleryItemController from "./upload-gallery-item";

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
  createGalleryController,
  deleteGalleryItemController,
  getGalleriesByParentController,
  getGalleriesPaginatedController,
  getGalleryController,
  hardDeleteGalleryController,
  updateGalleryController,
  uploadGalleryItemController,
};
