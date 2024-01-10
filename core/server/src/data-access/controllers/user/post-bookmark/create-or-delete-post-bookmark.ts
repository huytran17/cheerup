import { CreatePostBookmark } from "../../../../use-cases/post-bookmark/create-post-bookmark";
import { HardDeletePostBookmark } from "../../../../use-cases/post-bookmark/hard-delete-post-bookmark";
import { GetPost } from "../../../../use-cases/post/get-post";
import { GetUser } from "../../../../use-cases/user/get-user";
import { GetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { Request } from "express";
import { get, merge } from "lodash";
import Moment from "moment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

interface IPayload {
  post: string;
}

export default function makeCreateOrDeletePostBookmarkController({
  createPostBookmark,
  hardDeletePostBookmark,
  getPostBookmarkByUserAndPost,
  getPost,
  getUser,
  moment,
}: {
  createPostBookmark: CreatePostBookmark;
  hardDeletePostBookmark: HardDeletePostBookmark;
  getPostBookmarkByUserAndPost: GetPostBookmarkByUserAndPost;
  getPost: GetPost;
  getUser: GetUser;
  moment: typeof Moment;
}) {
  return async function createOrDeletePostBookmarkController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = <IUser>get(httpRequest, "context.user", {});

      const user_exists = await getUser({ _id: user_id });

      if (isEmpty(user_exists)) {
        throw new Error(`User by id ${user_id} does not exists`);
      }

      const { post: post_id } = <IPayload>(
        get(httpRequest, "context.validated", {})
      );

      const post_exists = await getPost({ _id: post_id });

      if (isEmpty(post_exists)) {
        throw new Error(`Post by id ${post_id} does not exists`);
      }

      const post_bookmark_exists = await getPostBookmarkByUserAndPost({
        user_id,
        post_id,
      });

      let post_bookmark_data = {};

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
