import Storage from "../config/storage";

export default function deleteS3Object({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}): void {
  const validCredentials = bucket && key;
  if (!validCredentials) {
    return;
  }

  const params = {
    Bucket: bucket,
    Key: key,
  };

  Storage.deleteS3Object(params);
}
