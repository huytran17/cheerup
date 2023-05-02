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
import { fakePost, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { PostModel, SubscriptionModel, UserModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeUpdatePost from "../../../../use-cases/post/update-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetActivatingSubscriptions from "../../../../use-cases/subscription/get-activating-subscriptions";
import makePublishPostController from "./publish-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Post from "../../../../database/entities/post";

describe("publishPost", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains an post entity", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });
    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const createPost = makeCreatePost({ postDb });
    const getPost = makeGetPost({ postDb, logger });
    const updatePost = makeUpdatePost({ postDb });
    const getActivatingSubscriptions = makeGetActivatingSubscriptions({
      subscriptionDb,
      logger,
    });

    const mock_post_data = fakePost();
    const mock_user_details = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });
    const created_user = await createUser({
      userDetails: mock_user_details,
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
        user: created_user,
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
