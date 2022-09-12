import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { IUpdateComment } from "../../../../use-cases/comment/update-comment";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeLikeCommentController({
  getComment,
  updateComment,
  logger,
}: {
  getComment: IGetComment;
  updateComment: IUpdateComment;
  logger: Logger;
}) {
  return async function likeCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");
      const { _id: comment_id } = _.get(httpRequest, "context.validated");
      const exists = await getComment({ _id: comment_id });
      if (!exists) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const current_users_liked = _.get(exists, "meta.likes", []);
      const current_users_disliked = _.get(exists, "meta.dislikes", []);

      const is_user_liked = _.includes(current_users_liked, user_id);
      const is_user_disliked = _.includes(current_users_disliked, user_id);

      if (is_user_liked) {
        Object.assign(exists, {
          meta: {
            ...exists.meta,
            likes: _.remove(
              current_users_liked,
              (_user_id) => _user_id === user_id
            ),
          },
        });
      } else {
        Object.assign(exists, {
          meta: {
            ...exists.meta,
            likes: _.concat(current_users_liked, [user_id]),
          },
        });

        if (is_user_disliked) {
          Object.assign(exists, {
            meta: {
              ...exists.meta,
              dislikes: _.remove(
                current_users_liked,
                (_user_id) => _user_id === user_id
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
