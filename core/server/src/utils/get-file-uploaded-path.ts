import { replace } from "lodash";

export default function getFIleUploadedPath(path: string): string {
  if (!path) {
    return;
  }

  const upload_path = path.substring(path.indexOf("\\upload"));
  const host_path = `${process.env.BASE_URL}${upload_path}`;

  return replace(host_path, /\\/g, "/");
}
