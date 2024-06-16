import { Router } from "express";
import authenticateUserJWT from "../../../config/middlewares/authenticate-user-jwt";
import { diskUpload } from "../../../config/multer";
import { MimeTypes } from "../../../constants/mime-types";
import userRouter from "./user";

const apiV2Router = Router();

const disk_upload = diskUpload({ mimetypes: MimeTypes.IMAGE }).single("file");

apiV2Router.use("/user", authenticateUserJWT(), disk_upload, userRouter);

export default apiV2Router;
