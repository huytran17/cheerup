import multer from "multer";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";
import IUser from "../../database/interfaces/user";

export default function makeDiskFileUploadMiddleware() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const user = <IUser>req.user;
      const file_path = resolve("src", "public", "upload", user.email);

      !existsSync(file_path) && mkdirSync(file_path);

      cb(null, file_path);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  return upload;
}

const disk_upload = makeDiskFileUploadMiddleware();
export { disk_upload };
