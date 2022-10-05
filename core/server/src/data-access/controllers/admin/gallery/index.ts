import {
  getGallery,
  updateGallery,
  getGalleriesByPost,
  hardDeleteGallery,
} from "../../../../use-cases/gallery";
import { getPost } from "../../../../use-cases/post";
import { logger } from "../../../../config/logs/logger";

import makeHardDeleteGalleryController from "./hard-delete-gallery";
import makeHardDeleteGalleryItemController from "./hard-delete-gallery-item";
import makeGetGalleriesByPostController from "./get-galleries-by-post";
import makeUploadGalleryItemController from "./upload-gallery-item";

const uploadGalleryItemController = makeUploadGalleryItemController({
  getGallery,
  updateGallery,
  logger,
});

const getGalleriesByPostController = makeGetGalleriesByPostController({
  getGalleriesByPost,
  getPost,
  logger,
});

const hardDeleteGalleryItemController = makeHardDeleteGalleryItemController({
  getGallery,
  updateGallery,
  logger,
});

const hardDeleteGalleryController = makeHardDeleteGalleryController({
  hardDeleteGallery,
  logger,
});

export default Object.freeze({
  hardDeleteGalleryController,
  hardDeleteGalleryItemController,
  getGalleriesByPostController,
  uploadGalleryItemController,
});

export {
  hardDeleteGalleryController,
  hardDeleteGalleryItemController,
  getGalleriesByPostController,
  uploadGalleryItemController,
};
