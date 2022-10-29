import { logger } from "../../config/logs/logger";
import { GalleryDb } from "../../data-access";
import makeGetGallery from "./get-gallery";
import makeUpdateGallery from "./update-gallery";
import makeCreateGallery from "./create-gallery";
import makeHardDeleteGallery from "./hard-delete-gallery";
import makeGetGalleriesPaginated from "./get-galleries-paginated";

const getGalleriesPaginated = makeGetGalleriesPaginated({
  galleryDb: GalleryDb,
  logger,
});

const hardDeleteGallery = makeHardDeleteGallery({
  galleryDb: GalleryDb,
});

const getGallery = makeGetGallery({
  galleryDb: GalleryDb,
  logger,
});

const updateGallery = makeUpdateGallery({
  galleryDb: GalleryDb,
});

const createGallery = makeCreateGallery({
  galleryDb: GalleryDb,
});

const galleryServices = Object.freeze({
  getGallery,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleriesPaginated,
});

export default galleryServices;

export {
  getGallery,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleriesPaginated,
};
