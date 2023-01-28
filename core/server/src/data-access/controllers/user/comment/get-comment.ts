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
      const { _id: comment_id } = _.get(httpRequest, "context.validated");
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
        is_include_deleted: false,
      });
      const comment_not_exists = _.isEmpty(exists) || _.isNil(exists);
      if (comment_not_exists) {
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

      const final_comment_data = await map_meta_data(exists);
      const map_meta_data_children_promises = exists.children?.map(
        async (comment: IComment) => {
          return await map_meta_data(comment);
        }
      );

      const mapped_meta_data_children = await Promise.all(
        map_meta_data_children_promises
      );
      final_comment_data.children = mapped_meta_data_children;

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
