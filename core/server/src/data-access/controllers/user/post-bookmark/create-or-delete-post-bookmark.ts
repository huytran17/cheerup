import { ICreatePostBookmark } from "../../../../use-cases/post-bookmark/create-post-bookmark";
import { IHardDeletePostBookmark } from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";
import Moment from "moment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateOrDeletePostBookmarkController({
  createPostBookmark,
  hardDeletePostBookmark,
  getPostBookmarkByUserAndPost,
  logger,
  moment,
}: {
  createPostBookmark: ICreatePostBookmark;
  hardDeletePostBookmark: IHardDeletePostBookmark;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
  logger: Logger;
  moment: typeof Moment;
}) {
  return async function createOrDeletePostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { post: post_id } = _.get(httpRequest, "context.validated");
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const post_bookmark_exists = await getPostBookmarkByUserAndPost({
        user_id,
        post_id,
      });

      let post_bookmark_data = Object.assign({});

      if (isEmpty(post_bookmark_exists)) {
        const post_bookmark_details = Object.assign(
          {},
          {
            user: user_id,
            post: post_id,
            timeline_date: moment(new Date()).format("YYYY-MM-DD"),
          }
        );

        post_bookmark_data = await createPostBookmark({
          postBookmarkDetails: post_bookmark_details,
        });
      } else {
        post_bookmark_data = await hardDeletePostBookmark({
          _id: post_bookmark_exists._id,
        });
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: post_bookmark_data,
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
