import { ICreatePostBookmark } from "../../../../use-cases/post-bookmark/create-post-bookmark";
import { IHardDeletePostBookmark } from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreateOrDeletePostBookmarkController({
  createPostBookmark,
  hardDeletePostBookmark,
  getPostBookmarkByUserAndPost,
  logger,
}: {
  createPostBookmark: ICreatePostBookmark;
  hardDeletePostBookmark: IHardDeletePostBookmark;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
  logger: Logger;
}) {
  return async function createOrDeletePostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const postBookmarkDetails = _.get(httpRequest, "context.validated");
      const { user: user_id, post: post_id } = postBookmarkDetails;

      const post_bookmark_exists = await getPostBookmarkByUserAndPost({
        user_id,
        post_id,
      });

      const post_bookmark_not_exists =
        _.isEmpty(post_bookmark_exists) || _.isNil(post_bookmark_exists);

      let post_bookmark_data = Object.assign({});

      if (post_bookmark_not_exists) {
        post_bookmark_data = await createPostBookmark({
          postBookmarkDetails,
        });
      } else {
        post_bookmark_data = await hardDeletePostBookmark({
          _id: post_bookmark_exists._id,
        });
      }

      return {
        headers,
        statusCode: 200,
        body: {
          data: post_bookmark_data,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}
