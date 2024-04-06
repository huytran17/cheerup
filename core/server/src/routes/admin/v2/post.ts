import express from "express";
import makeValidator from "../../../config/middlewares/validator";
import makeExpressCallback from "../../../config/express-callback";

import { uploadPostThumbnailRules } from "../../../data-access/controllers/admin/v2/post/validators";
import { uploadPostThumbnailController } from "../../../data-access/controllers/admin/v2/post";

const postRouter = express.Router();

postRouter.post(
  "/upload-thumbnail/:_id",
  makeValidator(uploadPostThumbnailRules),
  makeExpressCallback(uploadPostThumbnailController)
);

export default postRouter;
