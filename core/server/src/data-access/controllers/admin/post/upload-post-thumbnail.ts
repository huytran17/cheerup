import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetPost, IGetPostPayload } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import deleteS3Object from "../../../../utils/delete-s3-object";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUploadPostThumbnailController({
  getPost,
  updatePost,
}: {
  getPost: GetPost;
  updatePost: UpdatePost;
}) {
  return async function uploadPostThumbnailController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetPostPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getPost({ _id });

      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const file = <Record<string, unknown>>(
        get(httpRequest, "context.file", {})
      );

      if (isEmpty(file)) {
        throw new Error(`File does not exist`);
      }

      const bucket = <string>get(exists, "thumbnail.bucket", "");
      const key = <string>get(exists, "thumbnail.key", "");

      deleteS3Object({ bucket, key });

      const post_details = {
        ...exists,
        thumbnail: file,
        seo: {
          ...exists.seo,
          thumbnail: file.location,
        },
      };

      const updated_post = await updatePost(post_details);

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
