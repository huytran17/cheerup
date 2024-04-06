import express from "express";
import makeValidator from "../../../config/middlewares/validator";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import { AuthorizationRole } from "../../../constants/authorization-role";

import { uploadUserAvatarRules } from "../../../data-access/controllers/admin/v2/user/validators";
import { uploadUserAvatarController } from "../../../data-access/controllers/admin/v2/user";

const userRouter = express.Router();

userRouter.post(
  "/upload-avatar/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

export default userRouter;
