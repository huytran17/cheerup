import { Request } from "express";
import { convert } from "html-to-text";
import _ from "lodash";
import { Logger } from "winston";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { ICreatePost } from "../../../../use-cases/post/create-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { IGetActivatingSubscriptions } from "../../../../use-cases/subscription/get-activating-subscriptions";

export default function makeCreatePostController({
  createPost,
  getAdmin,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  updatePost,
  logger,
}: {
  createPost: ICreatePost;
  getAdmin: IGetAdmin;
  getActivatingSubscriptions: IGetActivatingSubscriptions;
  getEmailContent: IGetEmailContent;
  renderEmailContent: IRenderEmailContent;
  sendEmail: ISendEmail;
  updatePost: IUpdatePost;
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
        is_published: is_auto_censorship_post,
      });

      let created_post = await createPost({
        postDetails: final_post_details,
      });

      const { is_published, title, description, categories, author, tags } =
        created_post;

      if (is_published) {
        const subscriptions = await getActivatingSubscriptions();

        const send_notification_promises = _.map(
          subscriptions,
          async (subscription) => {
            const user_email = _.get(subscription, "email", "");

            const email_content = await getEmailContent({
              to: user_email,
              type: "new-post-notification",
            });

            const categories_titles = _.map(categories, (category) =>
              _.get(category, "title", "")
            );

            const rendered_email_content = await renderEmailContent({
              email_content,
              user_template_data: {
                email: user_email,
                title,
                description: convert(description, { wordwrap: 10 }),
                categories: _.join(categories_titles, ", "),
                author: _.get(author, "full_name", ""),
                tags: _.join(tags, ", "),
              },
            });

            await sendEmail(rendered_email_content);
          }
        );

        logger.verbose(
          `Sending notifications email for new post to subscribers...`
        );
        await Promise.all(
          _.filter(send_notification_promises, (promise) => promise)
        );
        logger.verbose(
          `Sent notifications email for new post to subscribers!!!`
        );

        const final_post_details = Object.assign({}, created_post, {
          is_notified_to_user: true,
        });

        created_post = await updatePost({ postDetails: final_post_details });
      }

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
        body: {
          data: created_post,
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
