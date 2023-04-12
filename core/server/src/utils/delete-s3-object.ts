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

  const s3 = Storage.getS3();

  s3.deleteObject(params, (error, data) =>
    error ? console.log(error, error.stack) : console.log(data)
  );
}
