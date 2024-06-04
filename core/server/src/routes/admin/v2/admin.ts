import express from "express";
import makeExpressCallback from "../../../config/express-callback";
import makeValidator from "../../../config/middlewares/validator";
import { uploadAvatarController } from "../../../data-access/controllers/admin/v2/admin";
import { uploadAvatarRules } from "../../../data-access/controllers/admin/v2/admin/validators";

const adminRouter = express.Router();

adminRouter.post(
  "/upload-avatar/:_id",
  makeValidator(uploadAvatarRules),
  makeExpressCallback(uploadAvatarController)
);

export default adminRouter;
