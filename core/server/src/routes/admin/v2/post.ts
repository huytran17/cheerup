import { Router } from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeValidator from "../../../config/middlewares/validator";
import { uploadPostThumbnailController } from "../../../data-access/controllers/admin/v2/post";
import { uploadPostThumbnailRules } from "../../../data-access/controllers/admin/v2/post/validators";

const postRouter = Router();

postRouter.post(
  "/upload-thumbnail/:_id",
  makeValidator(uploadPostThumbnailRules),
  makeExpressCallback(uploadPostThumbnailController)
);

export default postRouter;
