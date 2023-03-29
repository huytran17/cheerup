import { IGetPost } from "../../../../use-cases/post/get-post";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { ICreateComment } from "../../../../use-cases/comment/create-comment";
import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import { ICountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { IGetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateCommentController({
  createComment,
  getPost,
  getUser,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
}: {
  createComment: ICreateComment;
  getPost: IGetPost;
  getUser: IGetUser;
  countCommentLikeByCommentAndType: ICountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: IGetCommentLikeByUserAndComment;
}) {
  return async function createCommentController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = get(httpRequest, "context.user");
      const commentDetails = get(httpRequest, "context.validated");

      const { post: post_id } = commentDetails;
      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

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

      const user_exists = await getUser({
        _id: user_id,
        is_include_deleted: false,
      });

      if (isEmpty(user_exists)) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      const is_user_blocked_comment = get(
        user_exists,
        "is_blocked_comment",
        false
      );
      if (is_user_blocked_comment) {
        throw new Error(`User by ${user_id} has been blocked from comments`);
      }

      const final_comment_data = Object.assign({}, commentDetails, {
        user: user_id,
      });

      const created_comment = await createComment({
        commentDetails: final_comment_data,
      });

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
