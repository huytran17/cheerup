import express from "express";
import makeExpressCallback from "../../../../config/express-callback";
import makeValidator from "../../../../config/middlewares/validator";
import { uploadPostThumbnailController } from "../../../../data-access/controllers/admin/v2/post";
import { uploadPostThumbnailRules } from "../../../../data-access/controllers/admin/v2/post/validators";

const postRouter = express.Router();

postRouter.post(
  "/upload-posts",
  makeValidator(uploadPostThumbnailRules),
  makeExpressCallback(uploadPostThumbnailController)
);

export default postRouter;
