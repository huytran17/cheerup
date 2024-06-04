import Multer, { FileFilterCallback } from "multer";
import { tmpdir } from "os";
import IUser from "../../database/interfaces/user";

export interface IOptions {
  size?: number;
  mimetypes?: string[];
}

export type TempUpload = ({ size, mimetypes }: IOptions) => Multer.Multer;

export default function makeTempUpload({
  multer,
}: {
  multer: typeof Multer;
}): TempUpload {
  return function tempUpload({ size = 1e6, mimetypes = [] }) {
    const file_filter = (
      req: Express.Request,
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
      dest: tmpdir(),
      fileFilter: file_filter,
      limits: {
        fileSize: size,
      },
    });

    return upload;
  };
}
