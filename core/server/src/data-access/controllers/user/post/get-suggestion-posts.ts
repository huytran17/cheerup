import { Request } from "express";
import { IGetSuggestionPosts } from "../../../../use-cases/post/get-suggestion-posts";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetSuggestionPostsController({
  getSuggestionPosts,
  logger,
}: {
  getSuggestionPosts: IGetSuggestionPosts;
  logger: Logger;
}) {
  return async function getSuggestionPostsController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { amount, categories } = _.get(httpRequest, "context.validated");

      const categories_array = _.split(categories, ",");

      const exists = await getSuggestionPosts({
        amount: Number(amount),
        categories: categories_array,
      });

      return {
        headers,
        statusCode: 200,
        body: {
          data: exists,
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
