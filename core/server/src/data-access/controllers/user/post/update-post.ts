import { GetPost } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
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
  getPost: GetPost;
  updatePost: UpdatePost;
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
      const { _id }: { _id: string } = postDetails;

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const updated_post = await updatePost({ postDetails });

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
