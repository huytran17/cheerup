import { Request } from "express";
import {
  GetComment,
  IGetCommentPayload,
} from "../../../../use-cases/comment/get-comment";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCommentController({
  getComment,
}: {
  getComment: GetComment;
}) {
  return async function getCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetCommentPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getComment({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Comment ${_id} does not exists`);
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
