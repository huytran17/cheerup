import AWS from "aws-sdk";

export default class Storage {
  private static s3: AWS.S3;

  private constructor() {
    console.log("Initializing S3 Storage...");
  }

  static makeS3() {
    const s3 = new AWS.S3();
    console.log("Successfully connected to AWS S3");
    return s3;
  }

  static getS3() {
    if (!Storage.s3) {
      Storage.s3 = Storage.makeS3();
    }

    return Storage.s3;
  }

  static getSignedUrl(key: string) {
    if (!key) {
      return "";
    }

    const signed_url = Storage.s3.getSignedUrl("getObject", {
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    });

    return signed_url;
  }

  static deleteS3Object(params: { Bucket: string; Key: string }): void {
    Storage.s3.deleteObject(
      params,
      (error, data) => error && console.log(error, error.stack)
    );
  }
}
