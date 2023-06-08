import { Request } from "express";
import { IGetPostsPaginated } from "../../../../use-cases/post/get-posts-paginated";
import { IReadingTimeAnalyzer } from "../../../../config/reading-time/reading-time-analyzer";
import { ICountCommentsByPost } from "../../../../use-cases/comment/count-comments-by-post";
import { IGetPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark/get-post-bookmark-by-user-and-post";
import { get, map, replace, split, merge } from "lodash";
import Post from "../../../../database/entities/post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { isEmpty } from "../../../../utils/is-empty";

export default function makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  getPostBookmarkByUserAndPost,
  readingTimeAnalyzer,
}: {
  getPostsPaginated: IGetPostsPaginated;
  countCommentsByPost: ICountCommentsByPost;
  getPostBookmarkByUserAndPost: IGetPostBookmarkByUserAndPost;
  readingTimeAnalyzer: IReadingTimeAnalyzer;
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
        tags,
        sorts,
      }: {
        query: string;
        page: string;
        entries_per_page: string;
        categories?: string;
        is_only_published?: boolean;
        user_id: string;
        tags?: string;
        sorts?: string;
      } = get(httpRequest, "context.validated");

      const categories_array = isEmpty(categories)
        ? []
        : split(categories, ",");
      const tags_array = isEmpty(tags) ? [] : split(tags, ",");

      const paginated_data = await getPostsPaginated(
        {
          categories: categories_array,
          is_only_published,
          tags: tags_array,
          sorts,
        },
        {
          query,
          page: Number(page),
          entries_per_page: Number(entries_per_page),
        }
      );

      const post_data = get(paginated_data, "data", []);
      const map_count_comments_promises = map(
        post_data,
        async (post: Partial<Post>) => {
          const [comments_count, post_bookmarked] = await Promise.all([
            countCommentsByPost({ post_id: post._id }),
            getPostBookmarkByUserAndPost({
              user_id,
              post_id: post._id,
            }),
          ]);

          const analyzing_text = replace(
            `${post.title} ${post.description} ${post.content}`,
            /<[^>]*>?/gm,
            ""
          );
          const reading_time = readingTimeAnalyzer({ text: analyzing_text });

          return merge({}, post, {
            comments_count,
            is_bookmarked: !isEmpty(post_bookmarked),
            reading_time,
          });
        }
      );

      const final_post_data = await Promise.all(map_count_comments_promises);

      const final_paginated_data = merge({}, paginated_data, {
        data: final_post_data,
      });

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
