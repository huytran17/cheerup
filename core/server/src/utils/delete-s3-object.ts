import Storage from "../config/storage";

interface IPayload {
  bucket: string;
  key: string;
}

export default function deleteS3Object({ bucket, key }: IPayload): void {
  if (!bucket || !key) {
    return;
  }

  const params = {
    Bucket: bucket,
    Key: key,
  };

  Storage.deleteS3Object(params);
}
