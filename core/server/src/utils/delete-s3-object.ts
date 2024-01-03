import Storage from "../config/storage";

export default function deleteS3Object({
  bucket,
  key,
}: {
  bucket: string;
  key: string;
}): void {
  if (!bucket || !key) {
    return;
  }

  const params = {
    Bucket: bucket,
    Key: key,
  };

  Storage.deleteS3Object(params);
}
