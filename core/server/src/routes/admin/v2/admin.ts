import express from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import makeValidator from "../../../config/middlewares/validator";
import { AuthorizationRole } from "../../../constants/authorization-role";

import { uploadAvatarController } from "../../../data-access/controllers/admin/v2/admin";
import { uploadAvatarRules } from "../../../data-access/controllers/admin/v2/admin/validators";

const adminRouter = express.Router();

adminRouter.post(
  "/upload-avatar/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadAvatarRules),
  makeExpressCallback(uploadAvatarController)
);

export default adminRouter;
