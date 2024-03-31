import multer from "multer";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import IUser from "../../database/interfaces/user";

export interface IDiskUploadedFile {
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
      const user = <IUser>req.user;

      if (!user) {
        return;
      }

      const file_path = resolve("src", "public", "upload", user.email);

      !existsSync(file_path) && mkdirSync(file_path);

      cb(null, file_path);
    },
    filename: (req, file, cb) => {
      const user = <IUser>req.user;

      if (!user) {
        return;
      }

      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new Error("Invalid file format."));
  };

  const upload = multer({
    storage,
    limits: {
      fileSize: 1e6,
    },
    fileFilter,
  });

  return upload;
}

const disk_upload = makeDiskUploadFileMiddleware().single("file");

export { disk_upload };
