import { IGetPost } from "../../../../use-cases/post/get-post";
import { IGetHighlightPost } from "../../../../use-cases/post/get-highlight-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeHightlightPostController({
  getPost,
  getHighlightPost,
  updatePost,
  logger,
}: {
  getPost: IGetPost;
  getHighlightPost: IGetHighlightPost;
  updatePost: IUpdatePost;
  logger: Logger;
}) {
  return async function hightlightPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");

      const exists = await getPost({ _id });
      if (isEmpty(exists)) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const previous_hightlighted_post = await getHighlightPost();
      const remove_previous_hightlighted_post_data = Object.assign(
        {},
        previous_hightlighted_post,
        {
          is_highlight: false,
        }
      );

      const highlight_current_post_data = Object.assign({}, exists, {
        is_highlight: true,
      });

      const [updated_post] = await Promise.all([
        updatePost({ postDetails: highlight_current_post_data }),
        updatePost({ postDetails: remove_previous_hightlighted_post_data }),
      ]);

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
