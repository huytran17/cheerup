import { Request } from "express";
import { IGetCommentsByPostPaginated } from "../../../../use-cases/comment/get-comments-by-post-paginated";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";
import { HttpStatusCode } from "../../../../constants/http-status-code";

export default function makeGetCommentsByPostController({
  getCommentsByPostPaginated,
  getPost,
  logger,
}: {
  getCommentsByPostPaginated: IGetCommentsByPostPaginated;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function getCommentsByPostPaginatedController(
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
        post_id,
      }: {
        query: string;
        page: string;
        entries_per_page: string;
        post_id: string;
      } = _.get(httpRequest, "context.validated");

      const post_exists = await getPost({
        _id: post_id,
        is_only_published: true,
        is_include_deleted: false,
      });

      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by ${post_id} does not exist`);
      }

      const data = await getCommentsByPostPaginated(
        { post_id, is_include_deleted: false },
        {
          query,
          page: Number(page),
          entries_per_page: Number(entries_per_page),
        }
      );

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          ...data,
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
