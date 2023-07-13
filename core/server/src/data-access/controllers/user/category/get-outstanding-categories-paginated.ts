import { Request } from "express";
import { get, map, sortBy, pick } from "lodash";
import { ICountPostByCategory } from "../../../../use-cases/post/count-post-by-category";
import { IGetCategoriesPaginated } from "../../../../use-cases/category/get-categories-paginated";
import Category from "../../../../database/entities/category";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetOutstandingCategoriesPaginatedController({
  countPostByCategory,
  getCategoriesPaginated,
}: {
  countPostByCategory: ICountPostByCategory;
  getCategoriesPaginated: IGetCategoriesPaginated;
}) {
  return async function getOutstandingCategoriesPaginatedController(
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

      const paginated_data = await getCategoriesPaginated({
        query,
        page: Number(page),
        entries_per_page: Number(entries_per_page),
      });

      const categories_data = get(paginated_data, "data", []);
      const map_count_post_promises = map(
        categories_data,
        async (category: Partial<Category>) => {
          const post_count = await countPostByCategory({
            category_id: category._id,
          });

          const created_by = pick(category.created_by, ["_id", "full_name"]);

          return Object.assign({}, category, {
            post_count,
            created_by,
          });
        }
      );

      const category_data = await Promise.all(map_count_post_promises);
      const sorted_category_data = sortBy(category_data, ["post_count"]);

      const final_paginated_data = {
        ...paginated_data,
        data: sorted_category_data,
      };

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: final_paginated_data,
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
