import multer from "multer";
import os from "os";

export default function makeTempUploadFile() {
  const upload = multer({ dest: os.tmpdir() });

  return upload;
}

const temp_load = makeTempUploadFile();
export { temp_load };
