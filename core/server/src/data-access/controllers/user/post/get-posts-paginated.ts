import { Request } from "express";
import { IGetPostsPaginated } from "../../../../use-cases/post/get-posts-paginated";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import _ from "lodash";
import { Logger } from "winston";
import Post from "../../../../database/entities/post";

export default function makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  getPostBookmarkByUserAndPost,
  logger,
}: {
  getPostsPaginated: IGetPostsPaginated;
  countCommentsByPost: ICountCommentsByPost;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
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
        categories,
        is_only_published,
        user_id,
      }: {
        query: string;
        page: string;
        entries_per_page: string;
        categories?: string;
        is_only_published?: boolean;
        user_id: string;
      } = _.get(httpRequest, "context.validated");

      const categories_array = _.isEmpty(categories)
        ? []
        : _.split(categories, ",");

      const paginated_data = await getPostsPaginated(
        { categories: categories_array, is_only_published },
        {
          query,
          page: Number(page),
          entries_per_page: Number(entries_per_page),
        }
      );

      const post_data = _.get(paginated_data, "data", []);
      const map_count_comments_promises = post_data.map(
        async (post: Partial<Post>) => {
          const [comments_count, post_bookmarked] = await Promise.all([
            countCommentsByPost({ post_id: post._id }),
            getPostBookmarkByUserAndPost({
              user_id,
              post_id: post._id,
            }),
          ]);

          return Object.assign({}, post, {
            comments_count,
            is_bookmarked:
              !_.isEmpty(post_bookmarked) && !_.isNil(post_bookmarked),
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
