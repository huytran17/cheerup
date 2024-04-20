import { Request } from "express";
import { get } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  CreateCommentLike,
  ICreateCommentLikePayload,
} from "../../../../use-cases/comment-like/create-comment-like";
import { UpdateCommentLike } from "../../../../use-cases/comment-like/update-comment-like";
import { HardDeleteCommentLike } from "../../../../use-cases/comment-like/hard-delete-comment-like";
import { GetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { GetComment } from "../../../../use-cases/comment/get-comment";
import { isEmpty } from "../../../../utils/is-empty";
import IUser from "../../../../database/interfaces/user";

export default function makeCreateOrUpdateCommentLikeController({
  createCommentLike,
  updateCommentLike,
  hardDeleteCommentLike,
  getComment,
  getCommentLikeByUserAndComment,
}: {
  createCommentLike: CreateCommentLike;
  updateCommentLike: UpdateCommentLike;
  hardDeleteCommentLike: HardDeleteCommentLike;
  getComment: GetComment;
  getCommentLikeByUserAndComment: GetCommentLikeByUserAndComment;
}) {
  return async function createOrUpdateCommentLikeController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    const return_function = (return_data?: null) => {
      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: return_data,
        },
      };
    };

    try {
      const comment_like_details = <ICreateCommentLikePayload>(
        get(httpRequest, "context.validated", {})
      );
      const { comment_id } = comment_like_details;

      const comment_exists = await getComment({
        _id: comment_id,
        is_only_parent: false,
      });

      if (isEmpty(comment_exists)) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const exists = <IUser>get(httpRequest, "context.user", {});

      const comment_like_exists = await getCommentLikeByUserAndComment({
        comment_id,
        user_id: exists._id,
      });

      const shouldDeleteCommentLike =
        !isEmpty(comment_like_exists) &&
        comment_like_exists.type === comment_like_details.type;

      if (shouldDeleteCommentLike) {
        await hardDeleteCommentLike({ _id: comment_like_exists._id });
        return return_function();
      }

      const final_comment_like_details = {
        user: exists,
        comment: comment_exists,
        type: comment_like_details.type,
      };

      if (isEmpty(comment_like_exists)) {
        await createCommentLike(final_comment_like_details);

        return return_function();
      }

      await updateCommentLike({
        ...final_comment_like_details,
        _id: comment_like_exists._id,
      });

      return return_function();
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
