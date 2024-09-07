import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { GalleryDb } from "../../data-access";
import makeCreateGallery from "./create-gallery";
import makeGetGalleriesByParent from "./get-galleries-by-parent";
import makeGetGalleriesPaginated from "./get-galleries-paginated";
import makeGetGallery from "./get-gallery";
import makeHardDeleteGallery from "./hard-delete-gallery";
import makeUpdateGallery from "./update-gallery";

const getGalleriesByParent = makeGetGalleriesByParent({
  galleryDb: GalleryDb,
  randomCacheTime,
  logger,
  redis,
});

const getGalleriesPaginated = makeGetGalleriesPaginated({
  galleryDb: GalleryDb,
  randomCacheTime,
  logger,
  redis,
});

const hardDeleteGallery = makeHardDeleteGallery({
  galleryDb: GalleryDb,
});

const getGallery = makeGetGallery({
  galleryDb: GalleryDb,
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
  getGalleriesByParent,
});

export default galleryServices;

export {
  createGallery,
  getGalleriesByParent,
  getGalleriesPaginated,
  getGallery,
  hardDeleteGallery,
  updateGallery,
};
