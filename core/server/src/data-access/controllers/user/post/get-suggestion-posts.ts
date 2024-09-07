import { Request } from "express";
import { filter, get, split } from "lodash";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  GetSuggestionPosts,
  IGetSuggestionPosts,
} from "../../../../use-cases/post/get-suggestion-posts";

interface IPayload
  extends Omit<IGetSuggestionPosts, "categories" | "exclude_ids"> {
  categories: string;
  exclude_ids?: string;
}

export default function makeGetSuggestionPostsController({
  getSuggestionPosts,
}: {
  getSuggestionPosts: GetSuggestionPosts;
}) {
  return async function getSuggestionPostsController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const {
        amount,
        categories = "",
        exclude_ids = "",
      } = <IPayload>get(httpRequest, "context.validated", {});

      const categories_array = filter(split(categories, ","));
      const exclude_ids_array = filter(split(exclude_ids, ","));

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
