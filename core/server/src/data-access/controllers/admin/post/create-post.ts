import { ICreatePost } from "../../../../use-cases/post/create-post";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { Logger } from "winston";
import { Request } from "express";
import _ from "lodash";

export default function makeCreatePostController({
  createPost,
  getAdmin,
  logger,
}: {
  createPost: ICreatePost;
  getAdmin: IGetAdmin;
  logger: Logger;
}) {
  return async function createPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id: admin_id } = _.get(httpRequest, "context.user");

      const postDetails = _.get(httpRequest, "context.validated");

      const admin = await getAdmin({ _id: admin_id });
      if (!admin) {
        throw new Error(`Admin by ${admin_id} does not exist`);
      }

      const { is_auto_censorship_post } = admin;

      const final_post_details = Object.assign({}, postDetails, {
        author: admin_id,
        is_published: is_auto_censorship_post
      });

      const created_post = await createPost({
        postDetails: final_post_details,
      });
      return {
        headers,
        statusCode: 200,
        body: {
          data: created_post,
        },
      };
    } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: err,
        },
      };
    }
  };
}
