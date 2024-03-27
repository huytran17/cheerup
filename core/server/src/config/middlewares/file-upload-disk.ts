import multer from "multer";

export default function makeDiskFileUpdateMiddleware() {
  const upload = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "/static/upload");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}`);
    },
  });

  return upload;
}

const disk_upload = makeDiskFileUpdateMiddleware();
export { disk_upload };
