import { IGetPost } from "../../../../use-cases/post/get-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IGetSubscriptions } from "../../../../use-cases/subscription/get-subscriptions";
import { Logger } from "winston";
import { convert } from "html-to-text";
import { Request } from "express";
import _ from "lodash";

export default function makePublishPostController({
  getPost,
  updatePost,
  getSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  logger,
}: {
  getPost: IGetPost;
  updatePost: IUpdatePost;
  getSubscriptions: IGetSubscriptions;
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
        const subscriptions = await getSubscriptions();

        const send_notification_promises = subscriptions.map(
          async (subscription) => {
            const { is_active } = subscription;
            if (!is_active) {
              return;
            }

            const user_email = _.get(subscription, "email", "");

            const email_content = await getEmailContent({
              to: user_email,
              type: "new-post-notification",
            });

            const categories_titles = categories.map((category) =>
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
          send_notification_promises.filter((promise) => promise)
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
        statusCode: 200,
        body: {
          data: updated_post,
        },
      };
    } catch (error) {
      return {
        headers,
        statusCode: 500,
        body: {
          data: error,
        },
      };
    }
  };
}
