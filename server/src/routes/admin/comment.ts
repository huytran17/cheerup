import express from "express";
import makeValidator from "../../config/middlewares/validator-middleware";
import makeExpressCallback from "../../config/express-callback";

import { deleteCommentRules } from "../../data-access/controllers/admin/comment/validators";
import { deleteCommentController } from "../../data-access/controllers/admin/comment";

const categoryRouter = express.Router();

categoryRouter.delete(
  "/:_id",
  makeValidator(deleteCommentRules),
  makeExpressCallback(deleteCommentController)
); // DONE

export default categoryRouter;
