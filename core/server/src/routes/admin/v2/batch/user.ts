import { Router } from "express";
import makeExpressCallback from "../../../../config/express-callback";
import makeAuthorization from "../../../../config/middlewares/authorization";
import { AuthorizationRole } from "../../../../constants/authorization-role";
import { batchUploadUsersController } from "../../../../data-access/controllers/admin/v2/user";

const userRouter = Router();

userRouter.post(
  "/upload-users",
  makeAuthorization(AuthorizationRole.ONLY_OWNER),
  makeExpressCallback(batchUploadUsersController)
);

export default userRouter;
