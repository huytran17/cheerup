import { Request } from "express";
import { convert } from "html-to-text";
import { get, join, map } from "lodash";
import { Logger } from "winston";
import { GetEmailContent } from "../../../../config/emailManager/get-email-content";
import { RenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { SendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IAdmin from "../../../../database/interfaces/admin";
import {
  CreatePost,
  ICreatePost,
} from "../../../../use-cases/post/create-post";
import { GetPost } from "../../../../use-cases/post/get-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { GetActivatingSubscriptions } from "../../../../use-cases/subscription/get-activating-subscriptions";

export default function makeCreatePostController({
  createPost,
  getPost,
  getActivatingSubscriptions,
  getEmailContent,
  renderEmailContent,
  sendEmail,
  updatePost,
  logger,
}: {
  createPost: CreatePost;
  getPost: GetPost;
  getActivatingSubscriptions: GetActivatingSubscriptions;
  getEmailContent: GetEmailContent;
  renderEmailContent: RenderEmailContent;
  sendEmail: SendEmail;
  updatePost: UpdatePost;
  logger: Logger;
}) {
  return async function createPostController(
    httpRequest: Request & { context: {} }
  ) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const admin = <IAdmin>get(httpRequest, "context.user", {});

      const post_details = <ICreatePost>(
        get(httpRequest, "context.validated", {})
      );

      const created_post = await createPost({
        ...post_details,
        author: admin,
      });

      const post = await getPost({ _id: created_post._id });

      const { title, description, categories } = post;

      logger.verbose(`Created post ${created_post.title}`);

      const subscriptions = await getActivatingSubscriptions();
      const send_notification_promises = map(
        subscriptions,
        async (subscription) => {
          const user_email = get(subscription, "email", "");

          if (!user_email) {
            return;
          }

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
              url: `${process.env.USER_DASHBOARD_URL}/post/${post.slug}`,
            },
          });

          await sendEmail(rendered_email_content);
        }
      );

      logger.verbose(
        `Sending notifications email for new post to subscribers...`
      );

      await Promise.all(send_notification_promises);

      logger.verbose(`Sent notifications email for new post to subscribers!!!`);

      const updated_post = await updatePost({
        ...created_post,
        is_notified_to_user: true,
        seo: {
          title: title,
          description: description,
          date_modified: post.created_at,
          date_published: post.created_at,
          author: admin.full_name,
          publisher: admin.full_name,
        },
      });

      return {
        headers,
        statusCode: HttpStatusCode.CREATED,
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
