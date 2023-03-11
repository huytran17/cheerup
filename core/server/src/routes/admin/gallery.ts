import express from "express";
import makeValidator from "../../config/middlewares/validator";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload";

import {
  getGalleriesPaginatedRules,
  deleteGalleryItemRules,
  hardDeleteGalleryRules,
  uploadGalleryItemRules,
  createGalleryRules,
  getGalleryRules,
  getGalleriesByParentRules,
  updateGalleryRules,
} from "../../data-access/controllers/admin/gallery/validators";
import {
  deleteGalleryItemController,
  getGalleryController,
  getGalleriesPaginatedController,
  uploadGalleryItemController,
  hardDeleteGalleryController,
  createGalleryController,
  getGalleriesByParentController,
  updateGalleryController,
} from "../../data-access/controllers/admin/gallery";

const galleryRouter = express.Router();

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
  upload.single("file"),
  makeValidator(uploadGalleryItemRules),
  makeExpressCallback(uploadGalleryItemController)
);

galleryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteGalleryRules),
  makeExpressCallback(hardDeleteGalleryController)
);

export default galleryRouter;
