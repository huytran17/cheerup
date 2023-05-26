import { Request } from "express";
import { IGetPostBookmarksPaginated } from "../../../../use-cases/post-bookmark/get-post-bookmarks-paginated";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { IGetUser } from "../../../../use-cases/user/get-user";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { get, map, replace } from "lodash";
import PostBookmark from "../../../../database/entities/post-bookmark";
import IPostBookmark from "../../../../database/interfaces/post-bookmark";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IPaginatedPostBookmarkResult } from "../../../../data-access/interfaces/post-bookmark-db";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPostBookmarksPaginatedController({
  getPostBookmarksPaginated,
  countCommentsByPost,
  readingTimeAnalyzer,
  getUser
}: {
  getPostBookmarksPaginated: IGetPostBookmarksPaginated;
  countCommentsByPost: ICountCommentsByPost;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
  getUser: IGetUser;
}) {
  return async function getPostBookmarksPaginatedController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        query,
        page,
        entries_per_page,
      }: {
        query: string;
        page: string;
        entries_per_page: string;
      } = get(httpRequest, "context.validated");

      const { _id } = get(httpRequest, "context.user")
      const user_exists = await getUser({ _id })

      if (isEmpty(user_exists)) {
        throw new Error(`User by ${_id} does not exist`);
      }

      const paginated_data = await getPostBookmarksPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
        user_id: _id
      });

      const post_bookmarks = get(paginated_data, "data", []);
      const map_count_comments_promises = map(
        post_bookmarks,
        async (post_bookmark: PostBookmark) => {
          const comments_count = await countCommentsByPost({
            post_id: get(post_bookmark, "post._id"),
          });

          const analyzing_text = `
          ${get(post_bookmark, "post.title", "")} 
          ${get(post_bookmark, "post.description", "")} 
          ${get(post_bookmark, "post.content", "")}
          `;

          const formatted_text = replace(analyzing_text, /<[^>]*>?/gm, "");

          const reading_time = readingTimeAnalyzer({ text: formatted_text });

          return {
            ...post_bookmark,
            reading_time,
            comments_count,
          };
        }
      );

      const final_post_data: IPostBookmark[] = await Promise.all(
        map_count_comments_promises
      );

      const final_paginated_data: IPaginatedPostBookmarkResult = {
        ...paginated_data,
        data: final_post_data,
      };

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          ...final_paginated_data,
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
