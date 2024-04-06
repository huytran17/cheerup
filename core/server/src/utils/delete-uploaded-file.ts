import { access, constants } from "fs";
import { unlink } from "fs/promises";
import getFileLocalPath from "./get-file-local-path";

export default function deleteUploadedFile(path: string): void {
  if (!path) {
    return;
  }

  const local_path = getFileLocalPath(path);

  access(local_path, constants.F_OK, (error) => {
    if (error) {
      return console.error(`Failed to delete: ${error.message}`);
    }

    unlink(local_path).catch(console.error);
  });
}
