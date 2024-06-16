import { Router } from "express";
import makeValidator from "../../../config/middlewares/validator";
import makeExpressCallback from "../../../config/express-callback";

import { uploadUserAvatarRules } from "../../../data-access/controllers/user/v2/user/validators";
import { uploadUserAvatarController } from "../../../data-access/controllers/user/v2/user";

const userRouter = Router();

userRouter.post(
  "/upload-avatar/:_id",
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

export default userRouter;
