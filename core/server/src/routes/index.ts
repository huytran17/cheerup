import express from "express";
import apiRouter from "./api";
import apiV2Router from "./api/v2";
import adminRouter from "./admin";

const appRouter = express.Router();

appRouter.use("/api", apiRouter);
appRouter.use("/api/v2", apiV2Router);
appRouter.use("/admin", adminRouter);

export default appRouter;
