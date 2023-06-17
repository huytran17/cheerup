import { Request } from "express";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPostController({
  getPost,
}: {
  getPost: IGetPost;
}) {
  return async function getPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id }: { _id: string } = get(httpRequest, "context.validated");

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post ${_id} does not exists`);
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
