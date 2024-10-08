import { Request } from "express";
import { get, map } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import { CommentLikeType } from "../../../../database/interfaces/comment-like";
import IUser from "../../../../database/interfaces/user";
import { CountCommentLikeByCommentAndType } from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import { GetCommentLikeByUserAndComment } from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import {
  GetCommentsByPostPaginated,
  IGetCommentsByPostPaginated,
} from "../../../../use-cases/comment/get-comments-by-post-paginated";
import { GetPost } from "../../../../use-cases/post/get-post";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetCommentsByPostPaginatedController({
  getCommentsByPostPaginated,
  getPost,
  countCommentLikeByCommentAndType,
  getCommentLikeByUserAndComment,
}: {
  getCommentsByPostPaginated: GetCommentsByPostPaginated;
  getPost: GetPost;
  countCommentLikeByCommentAndType: CountCommentLikeByCommentAndType;
  getCommentLikeByUserAndComment: GetCommentLikeByUserAndComment;
}) {
  return async function getCommentsByPostPaginatedController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { query, page, entries_per_page, post_id } = <
        IGetCommentsByPostPaginated
      >get(httpRequest, "context.validated", {});

      const post_exists = await getPost({ _id: post_id });

      if (isEmpty(post_exists)) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const { _id: user_id } = <IUser>get(httpRequest, "context.user") || {};

      const paginated_data = await getCommentsByPostPaginated({
        post_id,
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
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

      const comments_data = get(paginated_data, "data", []);
      const map_meta_data_promises = map(
        comments_data,
        async (comment: IComment) => await map_meta_data(comment)
      );

      const final_comments_data: IComment[] = await Promise.all(
        map_meta_data_promises
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          ...paginated_data,
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
