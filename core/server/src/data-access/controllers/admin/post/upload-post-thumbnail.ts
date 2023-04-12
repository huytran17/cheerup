import { Request } from "express";
import { get } from "lodash";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import deleteS3Object from "../../../../utils/delete-s3-object";

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
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getPost({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const file = get(httpRequest, "context.file");

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = get(exists, "thumbnail.bucket");
      const key = get(exists, "thumbnail.key");

      deleteS3Object({ bucket, key });

      const post_details = Object.assign({}, exists, {
        thumbnail: file,
      });

      const updated_post = await updatePost({
        postDetails: post_details,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_post,
        },
      };
    } catch (error) {
      throw {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
