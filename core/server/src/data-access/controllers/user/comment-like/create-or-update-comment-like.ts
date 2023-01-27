import { Request } from "express";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { ICreateCommentLike } from "../../../../use-cases/comment-like/create-comment-like";
import { IUpdateCommentLike } from "../../../../use-cases/comment-like/update-comment-like";
import { IGetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import { IGetComment } from "../../../../use-cases/comment/get-comment";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeCreateCommentLikeController({
  createCommentLike,
  updateCommentLike,
  getUser,
  getComment,
  getCommentLikeByUserAndComment,
  logger,
}: {
  createCommentLike: ICreateCommentLike;
  updateCommentLike: IUpdateCommentLike;
  getUser: IGetUser;
  getComment: IGetComment;
  getCommentLikeByUserAndComment: IGetCommentLikeByUserAndComment;
  logger: Logger;
}) {
  return async function createCommentLikeController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: user_id } = _.get(httpRequest, "context.user");

      const user_exists = await getUser({ _id: user_id });
      if (isEmpty(user_exists)) {
        throw new Error(`User by ${user_id} does not exist`);
      }

      const commentLikeDetails = _.get(httpRequest, "context.validated");
      const { comment_id } = commentLikeDetails;

      const comment_exists = await getComment({
        _id: comment_id,
      });

      if (isEmpty(comment_exists)) {
        throw new Error(`Comment by ${comment_id} does not exist`);
      }

      const comment_like_exists = await getCommentLikeByUserAndComment({
        comment_id,
        user_id,
      });

      let comment_like = {};
      if (isEmpty(comment_like_exists)) {
        comment_like = await createCommentLike({
          commentLikeDetails,
        });
      }

      comment_like = await updateCommentLike({
        commentLikeDetails,
      });

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: comment_like,
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
