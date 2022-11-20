import getGalleriesPaginatedRules from "./get-galleries-paginated";
import deleteGalleryItemRules from "./delete-gallery-item";
import hardDeleteGalleryRules from "./hard-delete-gallery";
import uploadGalleryItemRules from "./upload-gallery-item";
import createGalleryRules from "./create-gallery";
import getGalleryRules from "./get-gallery";
import getGalleriesByParentRules from "./get-galleries-by-parent";

export default Object.freeze({
  getGalleriesPaginatedRules,
  deleteGalleryItemRules,
  hardDeleteGalleryRules,
  uploadGalleryItemRules,
  createGalleryRules,
  getGalleryRules,
  getGalleriesByParentRules,
});

export {
  getGalleriesPaginatedRules,
  deleteGalleryItemRules,
  hardDeleteGalleryRules,
  uploadGalleryItemRules,
  createGalleryRules,
  getGalleryRules,
  getGalleriesByParentRules,
};
