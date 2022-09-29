import { Request } from "express";
import { IGetPostBookmarksPaginated } from "../../../../use-cases/post-bookmark/get-post-bookmarks-paginated";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import _ from "lodash";
import { Logger } from "winston";
import PostBookmark from "../../../../database/entities/post-bookmark";

export default function makeGetPostBookmarksPaginatedController({
  getPostBookmarksPaginated,
  countCommentsByPost,
  logger,
}: {
  getPostBookmarksPaginated: IGetPostBookmarksPaginated;
  countCommentsByPost: ICountCommentsByPost;
  logger: Logger;
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
      } = _.get(httpRequest, "context.validated");

      const paginated_data = await getPostBookmarksPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      const post_data = _.get(paginated_data, "data", []);
      const map_count_comments_promises = post_data.map(
        async (post_bookmark: Partial<PostBookmark>) => {
          const comments_count = await countCommentsByPost({
            post_id: _.get(post_bookmark, "post._id"),
          });

          return Object.assign({}, post_bookmark, {
            post: {
              ...post_bookmark.post,
              comments_count,
            },
          });
        }
      );

      const final_post_data = await Promise.all(map_count_comments_promises);

      const final_paginated_data = Object.assign({}, paginated_data, {
        data: final_post_data,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          ...final_paginated_data,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err.message,
        },
      };
    }
  };
}
