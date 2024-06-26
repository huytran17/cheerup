import { Request } from "express";
import { get, map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import IUser from "../../../../database/interfaces/user";
import { CountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { GetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import {
  GetComment,
  IGetCommentPayload,
} from "../../../../use-cases/comment/get-comment";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCommentController({
  getComment,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
}: {
  getComment: GetComment;
  countCommentLikeByCommentAndType: CountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: GetCommentLikeByUserAndComment;
}) {
  return async function getCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: comment_id, is_show_children } = <IGetCommentPayload>(
        get(httpRequest, "context.validated", {})
      );

      const exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
        is_show_children,
      });

      if (isEmpty(exists)) {
        throw new Error(`Comment ${comment_id} does not exists`);
      }

      const { _id: user_id } = <IUser>get(httpRequest, "context.user", {});

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

      const children_comment = get(exists, "children", []);
      const map_children_meta_data_promises = map(
        children_comment,
        async (child: IComment) => await map_meta_data(child)
      );

      const mapped_children_meta_data = await Promise.all(
        map_children_meta_data_promises
      );
      const mapped_comment_meta_data = await map_meta_data(exists);

      const final_comment_data: IComment = {
        ...mapped_comment_meta_data,
        children: mapped_children_meta_data,
      };

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
