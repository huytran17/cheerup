import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetComment } from "../../../../use-cases/comment/get-comment";
import {
  HardDeleteComment,
  IHardDeleteComment,
} from "../../../../use-cases/comment/hard-delete-comment";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeDeleteComment({
  getComment,
  hardDeleteComment,
}: {
  getComment: GetComment;
  hardDeleteComment: HardDeleteComment;
}) {
  return async function deleteCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IHardDeleteComment>(
        get(httpRequest, "context.validated", {})
      );

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
