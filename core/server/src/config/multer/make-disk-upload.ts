import { Request } from "express";
import { existsSync, mkdirSync } from "fs";
import Multer, { FileFilterCallback } from "multer";
import { resolve } from "path";
import IUser from "../../database/interfaces/user";

export interface IOptions {
  path?: string;
  name?: string;
  size?: number;
  mimetypes?: string[];
}

export type DiskUpload = ({
  path,
  name,
  size,
  mimetypes,
}: IOptions) => Multer.Multer;

export default function makeDiskUpload({
  multer,
}: {
  multer: typeof Multer;
}): DiskUpload {
  return function diskUpload({
    path = "upload",
    name,
    size = 1e6,
    mimetypes = [],
  }) {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const file_path = resolve("src", path);

        !existsSync(file_path) && mkdirSync(file_path);

        cb(null, file_path);
      },
      filename: (req, file, cb) => {
        const file_name = `${Date.now()}-${name || file.originalname}`;

        cb(null, file_name);
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

      if (mimetypes.includes(file.mimetype)) {
        return cb(null, true);
      }

      cb(new Error("Invalid file format."));
    };

    const upload = multer({
      storage,
      fileFilter: file_filter,
      limits: {
        fileSize: size,
      },
    });

    return upload;
  };
}
