import { unlink } from "fs/promises";

export default async function deleteUploadedFile(path: string): Promise<void> {
  return unlink(path).catch(console.error);
}
