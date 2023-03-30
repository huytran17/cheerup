import _ from "lodash";
import multer from "multer";
import multerS3 from "multer-s3";
import Storage from "../storage";

export default function makeS3FileUploadMiddleware() {
  const s3 = Storage.getS3();
  const upload = multer({
    storage: multerS3({
      s3,
      bucket: process.env.BUCKET_NAME || "some-bucket",
      cacheControl: "max-age=31536000",
      metadata: function (req, file, cb) {
        cb(null, {});
      },
      key: function (req, file, cb) {
        const original_name = file.originalname;
        cb(null, `upload/${Date.now().toString()}-${original_name}`);
      },
      acl: "public-read",
    }),
  });

  return upload;
}

const upload = makeS3FileUploadMiddleware();
export { upload };
