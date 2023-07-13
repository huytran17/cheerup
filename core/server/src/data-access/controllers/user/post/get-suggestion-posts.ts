import { Request } from "express";
import { IGetSuggestionPosts } from "../../../../use-cases/post/get-suggestion-posts";
import { get, split, filter, pick } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetSuggestionPostsController({
  getSuggestionPosts,
}: {
  getSuggestionPosts: IGetSuggestionPosts;
}) {
  return async function getSuggestionPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        amount,
        categories = "",
        exclude_ids = "",
      }: {
        amount: string;
        categories: string;
        exclude_ids?: string;
      } = get(httpRequest, "context.validated");

      const categories_array = filter(split(categories, ","));
      const exclude_ids_array = filter(split(exclude_ids, ","));

      const exists = await getSuggestionPosts({
        amount: Number(amount),
        categories: categories_array,
        exclude_ids: exclude_ids_array,
      });

      const final_posts_data = exists.map((post) => {
        const author = pick(post.author, ["_id", "full_name"]);
        return Object.assign({}, post, { author });
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: final_posts_data,
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
