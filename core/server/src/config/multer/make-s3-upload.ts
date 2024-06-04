import { Request } from "express";
import Multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import IUser from "../../database/interfaces/user";
import Storage from "../storage";

export interface IOptions {
  path?: string;
  name?: string;
  size?: number;
  mimetypes?: string[];
}

export type S3Upload = ({
  path,
  name,
  size,
  mimetypes,
}: IOptions) => Multer.Multer;

export default function makeS3Upload({
  multer,
}: {
  multer: typeof Multer;
}): S3Upload {
  return function s3Upload({
    path = "upload",
    name,
    size = 1e6,
    mimetypes = [],
  }) {
    const s3 = Storage.getS3();

    const storage = multerS3({
      s3,
      bucket: process.env.BUCKET_NAME || "some-bucket",
      cacheControl: "max-age=31536000",
      metadata: function (req, file, cb) {
        cb(null, {});
      },
      key: function (req, file, cb) {
        const file_name = `${Date.now()}-${name || file.originalname}`;

        cb(null, `${path}/${file_name}`);
      },
      acl: "public-read",
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
