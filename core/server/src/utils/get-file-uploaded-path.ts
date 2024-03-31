import { replace } from "lodash";

export default function getFIleUploadedPath(root_path: string): string {
  const path = root_path.substring(root_path.indexOf("\\upload"));
  const host_path = `${process.env.BASE_URL}${path}`;

  return replace(host_path, /\\/g, "/");
}
