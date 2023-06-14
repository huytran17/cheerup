import { ICreatePostBookmark } from "../../../../use-cases/post-bookmark/create-post-bookmark";
import { IHardDeletePostBookmark } from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { Request } from "express";
import { get, merge } from "lodash";
import Moment from "moment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateOrDeletePostBookmarkController({
  createPostBookmark,
  hardDeletePostBookmark,
  getPostBookmarkByUserAndPost,
  getPost,
  getUser,
  moment,
}: {
  createPostBookmark: ICreatePostBookmark;
  hardDeletePostBookmark: IHardDeletePostBookmark;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
  getPost: IGetPost;
  getUser: IGetUser;
  moment: typeof Moment;
}) {
  return async function createOrDeletePostBookmarkController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id }: { _id: string } = get(
        httpRequest,
        "context.user"
      );

      const user_exists = await getUser({
        _id: user_id,
        is_include_deleted: false,
      });

      if (isEmpty(user_exists)) {
        throw new Error(`User by id ${user_id} does not exists`);
      }

      const { post: post_id }: { post: string } = get(
        httpRequest,
        "context.validated"
      );

      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      if (isEmpty(post_exists)) {
        throw new Error(`User by id ${user_id} does not exists`);
      }

      const post_bookmark_exists = await getPostBookmarkByUserAndPost({
        user_id,
        post_id,
      });

      let post_bookmark_data = merge({});

      if (isEmpty(post_bookmark_exists)) {
        const post_bookmark_details = merge(
          {},
          {
            user: user_exists,
            post: post_exists,
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
