import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeDislikeCommentController({
  getComment,
  updateComment,
  getPost,
  logger,
}: {
  getComment: IGetComment;
  updateComment: IUpdateComment;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function dislikeCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");
      const { _id: comment_id } = _.get(httpRequest, "context.validated");

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
        is_include_deleted: false,
      });

      if (!exists) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const post_id = _.get(exists, "post._id");
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
      });

      const post_not_exists = !post_exists || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const current_users_liked = _.get(exists, "meta.likes", []).map(
        (user_id: any) => user_id.toString()
      );
      const current_users_disliked = _.get(exists, "meta.dislikes", []).map(
        (user_id: any) => user_id.toString()
      );

      const is_user_liked = _.includes(
        current_users_liked,
        user_id.toHexString()
      );
      const is_user_disliked = _.includes(
        current_users_disliked,
        user_id.toHexString()
      );

      if (is_user_disliked) {
        Object.assign(exists, {
          meta: {
            ...exists.meta,
            dislikes: _.compact(
              current_users_liked.filter(
                (_id: any) => _id !== user_id.toHexString()
              )
            ),
          },
        });
      } else {
        Object.assign(exists, {
          meta: {
            ...exists.meta,
            dislikes: _.concat(current_users_disliked, [user_id]),
          },
        });

        if (is_user_liked) {
          Object.assign(exists, {
            meta: {
              ...exists.meta,
              likes: _.compact(
                current_users_liked.filter(
                  (_id: any) => _id !== user_id.toHexString()
                )
              ),
            },
          });
        }
      }

      const updated_comment = await updateComment({ commentDetails: exists });

      return {
        headers,
        statusCode: 200,
        body: {
          data: updated_comment,
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
