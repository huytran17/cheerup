import express from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeValidator from "../../../config/middlewares/validator";
import {
  deleteGalleryItemController,
  uploadGalleryItemController,
} from "../../../data-access/controllers/admin/v2/gallery";
import {
  deleteGalleryItemRules,
  uploadGalleryItemRules,
} from "../../../data-access/controllers/admin/v2/gallery/validators";

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
