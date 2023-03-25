import moment from "moment";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makePostDb from "../../../make-post-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { PostModel, SubscriptionModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeUpdatePost from "../../../../use-cases/post/update-post";
import makeGetActivatingSubscriptions from "../../../../use-cases/subscription/get-activating-subscriptions";
import makePublishPostController from "./publish-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Post from "../../../../database/entities/post";

describe("publishPost", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("should return a body that contains an post entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const getPost = makeGetPost({ postDb, logger });
    const updatePost = makeUpdatePost({ postDb, logger });
    const getActivatingSubscriptions = makeGetActivatingSubscriptions({
      subscriptionDb,
      logger,
    });

    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const publishPostController = makePublishPostController({
      getPost,
      updatePost,
      getActivatingSubscriptions,
      getEmailContent,
      renderEmailContent,
      sendEmail,
      logger,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await publishPostController(request as any);

    const expected: ExpectSingleResult<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
