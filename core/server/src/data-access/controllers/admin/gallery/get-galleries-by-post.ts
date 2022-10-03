import { Request } from "express";
import { IGetGalleriesByPost } from "../../../../use-cases/gallery/get-galleries-by-post";
import { IGetPost } from "../../../../use-cases/post/get-post";
import _ from "lodash";
import { Logger } from "winston";

export default function makeGetGalleriesByPostController({
  getGalleriesByPost,
  getPost,
  logger,
}: {
  getGalleriesByPost: IGetGalleriesByPost;
  getPost: IGetPost;
  logger: Logger;
}) {
  return async function getGalleriesByPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { post_id } = _.get(httpRequest, "context.validated");

      const post_exists = await getPost({
        _id: post_id,
        is_include_deleted: false,
        is_only_published: true,
      });

      const post_not_exists = _.isEmpty(post_exists) || _.isNil(post_exists);
      if (post_not_exists) {
        throw new Error(`Post by id ${post_id} does not exists`);
      }

      const galleries = await getGalleriesByPost({ post_id: post_id });

      return {
        headers,
        statusCode: 200,
        body: {
          data: galleries,
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
