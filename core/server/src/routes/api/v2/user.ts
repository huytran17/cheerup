import { Router } from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeValidator from "../../../config/middlewares/validator";
import { uploadUserAvatarController } from "../../../data-access/controllers/user/v2/user";
import { uploadUserAvatarRules } from "../../../data-access/controllers/user/v2/user/validators";

const userRouter = Router();

userRouter.post(
  "/upload-avatar/:_id",
  makeValidator(uploadUserAvatarRules),
  makeExpressCallback(uploadUserAvatarController)
);

export default userRouter;
