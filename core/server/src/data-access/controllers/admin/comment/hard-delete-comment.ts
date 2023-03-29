import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IHardDeleteComment } from "../../../../use-cases/comment/hard-delete-comment";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteComment({
  getComment,
  hardDeleteComment,
}: {
  getComment: IGetComment;
  hardDeleteComment: IHardDeleteComment;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const commentDetails = get(httpRequest, "context.validated");
      const { _id } = commentDetails;

      const exists = await getComment({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const deleted_comment = await hardDeleteComment({ _id });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: deleted_comment,
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
