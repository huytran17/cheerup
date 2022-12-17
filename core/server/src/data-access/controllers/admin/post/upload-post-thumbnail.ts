import { Request } from "express";
import _ from "lodash";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import Storage from "../../../../config/storage";

export default function makeUploadPostThumbnailController({
  getPost,
  updatePost,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
}) {
  return async function uploadPostThumbnailController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = _.get(httpRequest, "context.validated");

      const exists = await getPost({ _id });
      const post_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (post_not_exists) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const file = _.get(httpRequest, "context.file");
      const file_not_exists = _.isEmpty(file) || _.isNil(file);
      if (file_not_exists) {
        throw new Error(`File does not exist`);
      }

      const current_bucket = _.get(exists, "thumbnail.bucket", "");
      const current_key = _.get(exists, "thumbnail.key", "");

      const validCredentials = current_bucket && current_key;
      if (!validCredentials) {
        const s3_params = {
          Bucket: current_bucket,
          Key: current_key,
        };

        Storage.deleteS3Object(s3_params);
      }

      const post_details = Object.assign({}, exists, {
        thumbnail: file,
      });

      const updated_post = await updatePost({
        postDetails: post_details,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_post,
        },
      };
    } catch (err) {
      // await session.abortTransaction();
      console.error(err);
      throw {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 404,
        body: {
          error: err.message,
        },
      };
    }
  };
}
