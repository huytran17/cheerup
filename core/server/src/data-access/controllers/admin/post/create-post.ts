import { Request } from "express";
import { convert } from "html-to-text";
import { get, map, join, merge } from "lodash";
import { Logger } from "winston";
import { GetEmailContent } from "../../../../config/emailManager/get-email-content";
import { RenderEmailContent } from "../../../../config/emailManager/render-email-content";
import { SendEmail } from "../../../../config/emailManager/send-email";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import {
  CreatePost,
  ICreatePostPayload,
} from "../../../../use-cases/post/create-post";
import { UpdatePost } from "../../../../use-cases/post/update-post";
import { GetActivatingSubscriptions } from "../../../../use-cases/subscription/get-activating-subscriptions";
import IAdmin from "../../../../database/interfaces/admin";
import { GetPost } from "../../../../use-cases/post/get-post";

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
      const { _id, full_name } = <IAdmin>get(httpRequest, "context.user", {});

      const postDetails = <ICreatePostPayload>(
        get(httpRequest, "context.validated", {})
      );

      const post_details = merge({}, postDetails, {
        author: _id,
      });

      const created_post = await createPost({
        postDetails: post_details,
      });

      const post = await getPost({ _id: created_post._id });

      const { title, description, categories, author, tags } = post;

      logger.verbose(`Created post ${created_post.title}`);

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

      await Promise.all(send_notification_promises);

      logger.verbose(`Sent notifications email for new post to subscribers!!!`);

      const final_post_details = merge({}, created_post, {
        is_notified_to_user: true,
        seo: {
          title: created_post?.title,
          description: created_post?.description,
          date_modified: created_post?.updated_at,
          author: full_name,
        },
      });

      const updated_post = await updatePost({
        postDetails: final_post_details,
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
