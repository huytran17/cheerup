import multer from "multer";
import makeTempUpload from "./make-temp-upload";
import makeDiskUpload from "./make-disk-upload";
import makeS3Upload from "./make-s3-upload";

const tempUpload = makeTempUpload({ multer });
const diskUpload = makeDiskUpload({ multer });
const s3Upload = makeS3Upload({ multer });

export default Object.freeze({
  tempUpload,
  diskUpload,
  s3Upload,
});

export { tempUpload, diskUpload, s3Upload };
