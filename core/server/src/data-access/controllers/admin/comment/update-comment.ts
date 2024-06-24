import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetComment } from "../../../../use-cases/comment/get-comment";
import {
  IUpdateCommentData,
  UpdateComment,
} from "../../../../use-cases/comment/update-comment";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeUpdateCommentController({
  getComment,
  updateComment,
}: {
  getComment: GetComment;
  updateComment: UpdateComment;
}) {
  return async function updateCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comment_details = <IUpdateCommentData>(
        get(httpRequest, "context.validated", {})
      );
      const { _id } = comment_details;

      const exists = await getComment({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const updated_comment = await updateComment(comment_details);

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_comment,
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
