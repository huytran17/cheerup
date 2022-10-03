import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  uploadGalleryRules,
  hardDeleteGalleryRules,
  deleteGalleryItemRules,
} from "../../data-access/controllers/admin/gallery/validators";
import {
  uploadGalleryController,
  hardDeleteGalleryController,
  deleteGalleryItemController,
} from "../../data-access/controllers/admin/gallery";

const galleryRouter = express.Router();

galleryRouter.put(
  "/upload-gallery-item/:_id",
  makeValidator(uploadGalleryRules),
  makeExpressCallback(uploadGalleryController)
); // DONE

galleryRouter.delete(
  "/hard-delete/:_id",
  makeValidator(hardDeleteGalleryRules),
  makeExpressCallback(hardDeleteGalleryController)
); // DONE

galleryRouter.delete(
  "/delete-gallery-item/:_id/:_item_id",
  makeValidator(deleteGalleryItemRules),
  makeExpressCallback(deleteGalleryItemController)
); // DONE

export default galleryRouter;
