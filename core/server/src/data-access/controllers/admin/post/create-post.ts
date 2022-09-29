import { ICreatePost } from "../../../../use-cases/post/create-post";
import { IUpdatePost } from "../../../../use-cases/post/update-post";
import { IGetAdmin } from "../../../../use-cases/admin/get-admin";
import { Logger } from "winston";
import { Request } from "express";
import { ISendEmail } from "../../../../config/emailManager/send-email";
import { IRenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { IGetEmailContent } from "../../../../config/emailManager/get-email-content";
import { IGetSubscriptions } from "../../../../use-cases/subscription/get-subscriptions";
import { convert } from "html-to-text";
import _ from "lodash";

export default function makeCreatePostController({
  createPost,
  getAdmin,
  getSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  updatePost,
  logger,
}: {
  createPost: ICreatePost;
  getAdmin: IGetAdmin;
  getSubscriptions: IGetSubscriptions;
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

        const final_post_details = Object.assign({}, created_post, {
          is_notified_to_user: true,
        });

        created_post = await updatePost({ postDetails: final_post_details });
      }

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
