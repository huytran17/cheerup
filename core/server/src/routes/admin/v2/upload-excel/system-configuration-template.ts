import { Router } from "express";
import makeExpressCallback from "../../../../config/express-callback";
import makeAuthorization from "../../../../config/middlewares/authorization";
import makeValidator from "../../../../config/middlewares/validator";
import { AuthorizationRole } from "../../../../constants/authorization-role";
import { uploadExcelTemplateController } from "../../../../data-access/controllers/admin/v2/system-configuration";
import { uploadExcelTemplateRules } from "../../../../data-access/controllers/admin/v2/system-configuration/validators";

const systemConfigurationTemplateRouter = Router();

systemConfigurationTemplateRouter.post(
  "/upload-excel-template/:type/:_id",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeValidator(uploadExcelTemplateRules),
  makeExpressCallback(uploadExcelTemplateController)
);

export default systemConfigurationTemplateRouter;
