import express from "express";
import apiRouter from "./api";
import adminRouter from "./admin";

const appRouter = express.Router();

appRouter.use("/api", apiRouter);
appRouter.use("/admin", adminRouter);

export default appRouter;
