import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import IUser from "../../../../database/interfaces/user";
import { CountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { GetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import {
  CreateComment,
  ICreateCommentPayload,
} from "../../../../use-cases/comment/create-comment";
import { GetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateCommentController({
  createComment,
  getPost,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
}: {
  createComment: CreateComment;
  getPost: GetPost;
  countCommentLikeByCommentAndType: CountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: GetCommentLikeByUserAndComment;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const comment_details = <ICreateCommentPayload>(
        get(httpRequest, "context.validated", {})
      );

      const { post: post_id } = comment_details;
      const post_exists = await getPost({ _id: post_id });

      if (isEmpty(post_exists)) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const is_post_blocked_comment = get(
        post_exists,
        "is_blocked_comment",
        false
      );
      if (is_post_blocked_comment) {
        throw new Error(`Post by ${post_id} has been blocked from comments`);
      }

      const user = <IUser>get(httpRequest, "context.user", {});

      if (user.is_blocked_comment) {
        throw new Error(`User by ${user._id} has been blocked from comments`);
      }

      const final_comment_data = {
        ...comment_details,
        user,
      };

      const created_comment = await createComment(final_comment_data);

      const map_meta_data = async (comment: IComment) => {
        const [likes_count, dislikes_count, comment_liked_by_user] =
          await Promise.all([
            countCommentLikeByCommentAndType({
              comment_id: comment._id,
              type: CommentLikeType.Like,
            }),
            countCommentLikeByCommentAndType({
              comment_id: comment._id,
              type: CommentLikeType.Dislike,
            }),
            getCommentLikeByUserAndComment({
              user_id: user._id,
              comment_id: comment._id,
            }),
          ]);

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

      const updated_comment_data: IComment = await map_meta_data(
        created_comment
      );

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: updated_comment_data,
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
