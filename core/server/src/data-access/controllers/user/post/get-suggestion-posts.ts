import { Request } from "express";
import { IGetSuggestionPosts } from "../../../../use-cases/post/get-suggestion-posts";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

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
      const { amount, categories, exclude_ids } = _.get(
        httpRequest,
        "context.validated"
      );

      const categories_array = _.split(categories, ",");
      const exclude_ids_array = _.split(exclude_ids, ",");

      const exists = await getSuggestionPosts({
        amount: Number(amount),
        categories: categories_array,
        exclude_ids: exclude_ids_array,
      });

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: exists,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        body: {
          data: error.message,
        },
      };
    }
  };
}
