import express from "express";
import makeExpressCallback from "../../../../config/express-callback";
import makeAuthorization from "../../../../config/middlewares/authorization";
import { AuthorizationRole } from "../../../../constants/authorization-role";
import { batchUploadAdminsController } from "../../../../data-access/controllers/admin/v2/admin";

const adminRouter = express.Router();

adminRouter.post(
  "/upload-admins",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeExpressCallback(batchUploadAdminsController)
);

export default adminRouter;
