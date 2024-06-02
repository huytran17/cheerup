import multer, { FileFilterCallback } from "multer";
import { tmpdir } from "os";

export default function makeTempUploadFile() {
  const file_filter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const valid_mimetypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (valid_mimetypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error("Invalid file format."));
  };

  const upload = multer({
    dest: tmpdir(),
    fileFilter: file_filter,
    limits: {
      fileSize: 1e6,
    },
  });

  return upload;
}

const temp_load = makeTempUploadFile();
export { temp_load };
