import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdatePostController({
  getPost,
  updatePost,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  logger: Logger;
}) {
  return async function updatePostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postDetails = get(httpRequest, "context.validated");
      const { _id } = postDetails;

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const final_post_details = {
        ...postDetails,
        seo: {
          ...postDetails?.seo,
          date_modified: exists?.updated_at,
        },
      };

      const updated_post = await updatePost({
        postDetails: final_post_details,
      });

      logger.verbose(`Updated post ${exists.title} successfully`);

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
