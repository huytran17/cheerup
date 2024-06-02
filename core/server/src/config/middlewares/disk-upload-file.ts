import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import multer, { FileFilterCallback } from "multer";
import { resolve } from "path";
import IUser from "../../database/interfaces/user";

export interface IDiskUploadFile {
  filename: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  path: string;
  size: number;
}

export default function makeDiskUploadFileMiddleware() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const file_path = resolve("src", "upload");

      !existsSync(file_path) && mkdirSync(file_path);

      cb(null, file_path);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const file_filter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const user = <IUser>req.user;

    if (!user) {
      return cb(new Error("Unauthorized."));
    }

    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new Error("Invalid file format."));
  };

  const upload = multer({
    storage,
    fileFilter: file_filter,
    limits: {
      fileSize: 1e6,
    },
  });

  return upload;
}

const disk_upload = makeDiskUploadFileMiddleware().single("file");

export { disk_upload };
