import express from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeAuthorization from "../../../config/middlewares/authorization";
import makeValidator from "../../../config/middlewares/validator";
import { AuthorizationRole } from "../../../constants/authorization-role";
import { uploadUserAvatarController } from "../../../data-access/controllers/admin/v2/user";
import { uploadUserAvatarRules } from "../../../data-access/controllers/admin/v2/user/validators";

const userRouter = express.Router();

userRouter.post(
  "/upload-avatar/:_id",
  makeAuthorization(AuthorizationRole.OWNER_AND_COLLABORATOR),
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

export default userRouter;
