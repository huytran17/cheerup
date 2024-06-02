import multer from "multer";
import { tmpdir } from "os";

export default function makeTempUploadFile() {
  const upload = multer({ dest: tmpdir() });

  return upload;
}

const temp_load = makeTempUploadFile();
export { temp_load };
