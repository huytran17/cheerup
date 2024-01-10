import { Request } from "express";
import {
  GetCommentsByParent,
  IGetCommentsByParentPayload,
} from "../../../../use-cases/comment/get-comments-by-parent";
import { get, map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { GetComment } from "../../../../use-cases/comment/get-comment";
import { isEmpty } from "../../../../utils/is-empty";
import IComment from "../../../../database/interfaces/comment";
import { CountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { GetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import IUser from "../../../../database/interfaces/user";

export default function makeGetCommentsByParentController({
  getCommentsByParent,
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
}: {
  getCommentsByParent: GetCommentsByParent;
  getComment: GetComment;
  countCommentLikeByCommentAndType: CountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: GetCommentLikeByUserAndComment;
}) {
  return async function getCommentsByParentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = <IGetCommentsByParentPayload>(
        get(httpRequest, "context.validated", {})
      );
      const { _id: user_id } = <IUser>get(httpRequest, "context.user") || {};

      const comment_exists = await getComment({ _id });
      if (isEmpty(comment_exists)) {
        throw new Error(`Comment by ${_id} does not exist`);
      }

      const comments = await getCommentsByParent({ _id });

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

      const map_meta_data_promises = map(
        comments,
        async (comment: IComment) => {
          return await map_meta_data(comment);
        }
      );

      const final_comments_data: IComment[] = await Promise.all(
        map_meta_data_promises
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_comments_data,
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
