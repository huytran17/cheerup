import { Router } from "express";
import makeExpressCallback from "../../config/express-callback";
import makeValidator from "../../config/middlewares/validator";
import {
  createGalleryController,
  deleteGalleryItemController,
  getGalleriesByParentController,
  getGalleriesPaginatedController,
  getGalleryController,
  hardDeleteGalleryController,
  updateGalleryController,
  uploadGalleryItemController,
} from "../../data-access/controllers/admin/gallery";
import {
  createGalleryRules,
  deleteGalleryItemRules,
  getGalleriesByParentRules,
  getGalleriesPaginatedRules,
  getGalleryRules,
  hardDeleteGalleryRules,
  updateGalleryRules,
  uploadGalleryItemRules,
} from "../../data-access/controllers/admin/gallery/validators";

const galleryRouter = Router();

galleryRouter.put(
  "/:_id",
  makeValidator(updateGalleryRules),
  makeExpressCallback(updateGalleryController)
);

galleryRouter.get(
  "/by-parent/:_id",
  makeValidator(getGalleriesByParentRules),
  makeExpressCallback(getGalleriesByParentController)
);

galleryRouter.post(
  "/",
  makeValidator(createGalleryRules),
  makeExpressCallback(createGalleryController)
);

galleryRouter.get(
  "/",
  makeValidator(getGalleriesPaginatedRules),
  makeExpressCallback(getGalleriesPaginatedController)
);

galleryRouter.get(
  "/:_id",
  makeValidator(getGalleryRules),
  makeExpressCallback(getGalleryController)
);

galleryRouter.put(
  "/delete-gallery-item/:_id",
  makeValidator(deleteGalleryItemRules),
  makeExpressCallback(deleteGalleryItemController)
);

galleryRouter.post(
  "/upload-gallery-item/:_id",
  makeValidator(uploadGalleryItemRules),
  makeExpressCallback(uploadGalleryItemController)
);

galleryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteGalleryRules),
  makeExpressCallback(hardDeleteGalleryController)
);

export default galleryRouter;
