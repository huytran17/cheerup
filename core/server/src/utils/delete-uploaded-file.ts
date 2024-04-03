import { unlink } from "fs/promises";

export default function deleteUploadedFile(path: string): void {
  unlink(path).catch(console.error);
}
