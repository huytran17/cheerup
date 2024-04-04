import { unlink } from "fs/promises";
import { existsSync } from "fs";

export default function deleteUploadedFile(path: string): void {
  if (!existsSync(path)) {
    return;
  }

  unlink(path).catch(console.error);
}
