import express from "express";
import makeExpressCallback from "../../../../config/express-callback";
import makeAuthorization from "../../../../config/middlewares/authorization";
import { AuthorizationRole } from "../../../../constants/authorization-role";
import { batchUploadCategoriesController } from "../../../../data-access/controllers/admin/v2/category";

const categoryRouter = express.Router();

categoryRouter.post(
  "/upload-categories",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeExpressCallback(batchUploadCategoriesController)
);

export default categoryRouter;
