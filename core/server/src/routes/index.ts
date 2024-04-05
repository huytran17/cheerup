import express from "express";
import adminRouter from "./admin";
import adminV2Router from "./admin/v2";
import apiRouter from "./api";
import apiV2Router from "./api/v2";

const appRouter = express.Router();

appRouter.use("/api", apiRouter);
appRouter.use("/api/v2", apiV2Router);
appRouter.use("/admin", adminRouter);
appRouter.use("/admin/v2", adminV2Router);

export default appRouter;
