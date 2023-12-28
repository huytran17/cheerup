import { GalleryDb } from "../../data-access";
import makeGetGallery from "./get-gallery";
import makeUpdateGallery from "./update-gallery";
import makeCreateGallery from "./create-gallery";
import makeHardDeleteGallery from "./hard-delete-gallery";
import makeGetGalleriesPaginated from "./get-galleries-paginated";
import makeGetGalleriesByParent from "./get-galleries-by-parent";

const getGalleriesByParent = makeGetGalleriesByParent({
  galleryDb: GalleryDb,
});

const getGalleriesPaginated = makeGetGalleriesPaginated({
  galleryDb: GalleryDb,
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
  getGallery,
  updateGallery,
  createGallery,
  hardDeleteGallery,
  getGalleriesPaginated,
  getGalleriesByParent,
};
