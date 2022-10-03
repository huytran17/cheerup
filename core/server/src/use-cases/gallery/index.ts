import { logger } from "../../config/logs/logger";
import { GalleryDb } from "../../data-access";
import makeGetGallery from "./get-gallery";
import makeGetGalleriesByPost from "./get-galleries-by-post";
import makeUpdateGallery from "./update-gallery";
import makeCreateGallery from "./create-gallery";
import makeHardDeleteGallery from "./hard-delete-gallery";
import makeGetGalleryByPost from "./get-gallery-by-post";

const getGalleryByPost = makeGetGalleryByPost({
  galleryDb: GalleryDb,
});

const hardDeleteGallery = makeHardDeleteGallery({
  galleryDb: GalleryDb,
});

const getGallery = makeGetGallery({
  galleryDb: GalleryDb,
  logger,
});

const getGalleriesByPost = makeGetGalleriesByPost({
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
  getGalleriesByPost,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleryByPost,
});

export default galleryServices;

export {
  getGallery,
  getGalleriesByPost,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleryByPost,
};
