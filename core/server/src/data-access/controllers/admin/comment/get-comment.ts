import { Request } from "express";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCommentController({
  getComment,
}: {
  getComment: IGetComment;
}) {
  return async function getCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { comment_id } = get(httpRequest, "context.validated");

      const exists = await getComment({ _id: comment_id });
      if (isEmpty(exists)) {
        throw new Error(`Comment ${comment_id} does not exists`);
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
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
