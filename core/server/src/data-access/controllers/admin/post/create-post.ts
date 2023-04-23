import { Request } from "express";
import { convert } from "html-to-text";
import { get, map, filter, join } from "lodash";
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
      const { _id: admin_id } = get(httpRequest, "context.user");

      const postDetails = get(httpRequest, "context.validated");

      const admin = await getAdmin({ _id: admin_id });
      if (!admin) {
        throw new Error(`Admin by ${admin_id} does not exist`);
      }

      const { is_auto_censorship_post } = admin;

      const final_post_details = Object.assign({}, postDetails, {
        author: admin,
        is_published: is_auto_censorship_post,
        published_by: (is_auto_censorship_post && admin) || null,
        published_at: (is_auto_censorship_post && new Date()) || null,
      });

      let created_post = await createPost({
        postDetails: final_post_details,
      });

      const { is_published, title, description, categories, author, tags } =
        created_post;

      logger.verbose(`Created post ${created_post.title}`);

      if (is_published) {
        const subscriptions = await getActivatingSubscriptions();

        const send_notification_promises = map(
          subscriptions,
          async (subscription) => {
            const user_email = get(subscription, "email", "");

            const email_content = await getEmailContent({
              to: user_email,
              type: "new-post-notification",
            });

            const categories_titles = map(categories, (category) =>
              get(category, "title", "")
            );

            const rendered_email_content = await renderEmailContent({
              email_content,
              user_template_data: {
                email: user_email,
                title,
                description: convert(description, { wordwrap: 10 }),
                categories: join(categories_titles, ", "),
                author: get(author, "full_name", ""),
                tags: join(tags, ", "),
              },
            });

            await sendEmail(rendered_email_content);
          }
        );

        logger.verbose(
          `Sending notifications email for new post to subscribers...`
        );
        await Promise.all(
          filter(send_notification_promises, (promise) => promise)
        );
        logger.verbose(
          `Sent notifications email for new post to subscribers!!!`
        );

        const final_post_details = Object.assign({}, created_post, {
          is_notified_to_user: true,
          seo: {
            date_modified: created_post?.updated_at,
            author: admin?.full_name,
            publisher: created_post?.published_by,
            date_published: created_post?.published_at,
          },
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
