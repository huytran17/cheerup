import { Request } from "express";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import { ICountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { IGetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import IComment from "../../../../database/interfaces/comment";

export default function makeGetCommentController({
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
  logger,
}: {
  getComment: IGetComment;
  countCommentLikeByCommentAndType: ICountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: IGetCommentLikeByUserAndComment;
  logger: Logger;
}) {
  return async function getCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: comment_id, is_show_children } = _.get(
        httpRequest,
        "context.validated"
      );
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
        is_show_children,
      });

      if (isEmpty(exists)) {
        throw new Error(`Comment ${comment_id} does not exists`);
      }

      const map_meta_data = async (comment: IComment) => {
        const likes_count = await countCommentLikeByCommentAndType({
          comment_id: comment._id,
          type: CommentLikeType.Like,
        });

        const dislikes_count = await countCommentLikeByCommentAndType({
          comment_id: comment._id,
          type: CommentLikeType.Dislike,
        });

        const comment_liked_by_user = await getCommentLikeByUserAndComment({
          user_id,
          comment_id: comment._id,
        });

        const is_liked =
          !isEmpty(comment_liked_by_user) &&
          comment_liked_by_user.type === CommentLikeType.Like;

        const is_disliked =
          !isEmpty(comment_liked_by_user) &&
          comment_liked_by_user.type === CommentLikeType.Dislike;

        return {
          ...comment,
          likes_count,
          dislikes_count,
          is_liked,
          is_disliked,
        };
      };

      const children_comment = _.get(exists, "children", []);
      const map_children_meta_data_promises = _.map(
        children_comment,
        async (child: IComment) => await map_meta_data(child)
      );

      const mapped_children_meta_data = await Promise.all(
        map_children_meta_data_promises
      );
      const mapped_comment_meta_data = await map_meta_data(exists);

      const final_comment_data: IComment = Object.assign(
        {},
        mapped_comment_meta_data,
        {
          children: mapped_children_meta_data,
        }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_comment_data,
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
