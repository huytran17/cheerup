import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getGalleriesPaginatedRules,
  deleteGalleryItemRules,
  hardDeleteGalleryRules,
  uploadGalleryItemRules,
  createGalleryRules,
  getGalleryRules,
} from "../../data-access/controllers/admin/gallery/validators";
import {
  deleteGalleryItemController,
  getGalleryController,
  getGalleriesPaginatedController,
  uploadGalleryItemController,
  hardDeleteGalleryController,
  createGalleryController,
} from "../../data-access/controllers/admin/gallery";

const galleryRouter = express.Router();

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
  "/delete-gallery-item/:_id/:item_id",
  makeValidator(deleteGalleryItemRules),
  makeExpressCallback(deleteGalleryItemController)
); // DONE

galleryRouter.put(
  "/upload-gallery-item/:_id",
  makeValidator(uploadGalleryItemRules),
  makeExpressCallback(uploadGalleryItemController)
); // DONE

galleryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteGalleryRules),
  makeExpressCallback(hardDeleteGalleryController)
); // DONE

export default galleryRouter;
