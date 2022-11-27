import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";
import { upload } from "../../config/middlewares/file-upload-middleware";

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
); // DONE

galleryRouter.get(
  "/by-parent/:_id",
  makeValidator(getGalleriesByParentRules),
  makeExpressCallback(getGalleriesByParentController)
); // DONE

galleryRouter.post(
  "/",
  makeValidator(createGalleryRules),
  makeExpressCallback(createGalleryController)
); // DONE

galleryRouter.get(
  "/",
  makeValidator(getGalleriesPaginatedRules),
  makeExpressCallback(getGalleriesPaginatedController)
); // DONE

galleryRouter.get(
  "/:_id",
  makeValidator(getGalleryRules),
  makeExpressCallback(getGalleryController)
); // DONE

galleryRouter.put(
  "/delete-gallery-item",
  makeValidator(deleteGalleryItemRules),
  makeExpressCallback(deleteGalleryItemController)
); // DONE

galleryRouter.post(
  "/upload-gallery-item/:_id",
  upload.single("file"),
  makeValidator(uploadGalleryItemRules),
  makeExpressCallback(uploadGalleryItemController)
); // DONE

galleryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteGalleryRules),
  makeExpressCallback(hardDeleteGalleryController)
); // DONE

export default galleryRouter;
