import { Request } from "express";
import { convert } from "html-to-text";
import _ from "lodash";
import { Logger } from "winston";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { IGetActivatingSubscriptions } from "../../../../use-cases/subscription/get-activating-subscriptions";

export default function makePublishPostController({
  getPost,
  updatePost,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  getActivatingSubscriptions: IGetActivatingSubscriptions;
  getEmailContent: IGetEmailContent;
  renderEmailContent: IRenderEmailContent;
  sendEmail: ISendEmail;
  logger: Logger;
}) {
  return async function publishPostController(
    httpRequest: Request & { context: { validated: {} } }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const { _id } = _.get(httpRequest, "context.validated");
      const exists = await getPost({ _id });
      if (!exists) {
        throw new Error(`Post by ${_id} does not exist`);
      }

      const final_post_details = Object.assign({}, exists, {
        is_published: true,
      });

      let updated_post = await updatePost({
        postDetails: final_post_details,
      });

      const {
        is_notified_to_user,
        categories,
        title,
        description,
        author,
        tags,
      } = updated_post;

      if (!is_notified_to_user) {
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

        const final_post_details = Object.assign({}, updated_post, {
          is_notified_to_user: true,
        });

        updated_post = await updatePost({ postDetails: final_post_details });
      }

      return {
        headers,
        statusCode: HttpStatusCode.OK,
        body: {
          data: updated_post,
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
