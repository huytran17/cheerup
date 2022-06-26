import express from "express";
import swaggerUI from "../config/swagger/swagger-ui";
import swagger_admin_specifications from "../config/swagger/documentation/admin/swagger-jsdoc";
import swagger_user_specifications from "../config/swagger/documentation/user/swagger-jsdoc";

const swaggerRouter = express.Router();

swaggerRouter.use(
  "/admin/swagger",
  swaggerUI.serveFiles(swagger_admin_specifications, {})
);
swaggerRouter.get(
  "/admin/swagger",
  swaggerUI.setup(swagger_admin_specifications)
);

swaggerRouter.use(
  "/api/swagger",
  swaggerUI.serveFiles(swagger_user_specifications, {})
);
swaggerRouter.get("/api/swagger", swaggerUI.setup(swagger_user_specifications));

export default swaggerRouter;
