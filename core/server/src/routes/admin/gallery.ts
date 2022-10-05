import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import {
  getGalleriesByPostRules,
  hardDeleteGalleryItemRules,
  hardDeleteGalleryRules,
  uploadGalleryItemRules,
} from "../../data-access/controllers/admin/gallery/validators";
import {
  hardDeleteGalleryController,
  hardDeleteGalleryItemController,
  getGalleriesByPostController,
  uploadGalleryItemController,
} from "../../data-access/controllers/admin/gallery";

const galleryRouter = express.Router();

galleryRouter.get(
  "/by-post/:post_id",
  makeValidator(getGalleriesByPostRules),
  makeExpressCallback(getGalleriesByPostController)
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

galleryRouter.delete(
  "/hard-delete-gallery-item/:gallery_id/:_item_id",
  makeValidator(hardDeleteGalleryItemRules),
  makeExpressCallback(hardDeleteGalleryItemController)
); // DONE

export default galleryRouter;
