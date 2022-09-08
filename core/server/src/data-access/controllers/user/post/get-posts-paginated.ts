import { Request } from "express";
import { IGetPostsPaginated } from "../../../../use-cases/post/get-posts-paginated";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  logger,
}: {
  getPostsPaginated: IGetPostsPaginated;
  countCommentsByPost: ICountCommentsByPost;
  logger: Logger;
}) {
  return async function getPostsPaginatedController(
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

      const paginated_data = await getPostsPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      const post_data = _.get(paginated_data, "data", []);
      const map_count_comments_promises = post_data.map(async (post) => {
        const comments_count = await countCommentsByPost({ post_id: post._id });
        return Object.assign({}, post, {
          comments_count,
        });
      });

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
