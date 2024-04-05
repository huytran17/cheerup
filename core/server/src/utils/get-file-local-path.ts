import { replace } from "lodash";
import { resolve } from "path";

export default function getFileLocalPath(path: string): string {
  if (!path) {
    return;
  }

  const upload_path = path.substring(path.indexOf("/upload"));
  const local_path = resolve("src") + upload_path;

  return replace(local_path, /\//g, "\\");
}
