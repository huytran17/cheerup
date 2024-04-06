import express from "express";
import makeValidator from "../../../config/middlewares/validator";
import makeExpressCallback from "../../../config/express-callback";

import {
  uploadGalleryItemRules,
  deleteGalleryItemRules,
} from "../../../data-access/controllers/admin/v2/gallery/validators";
import {
  uploadGalleryItemController,
  deleteGalleryItemController,
} from "../../../data-access/controllers/admin/v2/gallery";

const galleryRouter = express.Router();

galleryRouter.post(
  "/upload-gallery-item/:_id",
  makeValidator(uploadGalleryItemRules),
  makeExpressCallback(uploadGalleryItemController)
);

galleryRouter.put(
  "/delete-gallery-item/:_id/:item_id",
  makeValidator(deleteGalleryItemRules),
  makeExpressCallback(deleteGalleryItemController)
);

export default galleryRouter;
