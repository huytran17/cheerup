import { unlink } from "fs/promises";

export default async function deleteUploadedFile(path: string): Promise<void> {
  return await unlink(path);
}
