import moment from "moment";
import { fakeAdmin, fakePost } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/email-manager";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IPost from "../../../../database/interfaces/post";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeUpdatePost from "../../../../use-cases/post/update-post";
import makeGetActivatingSubscriptions from "../../../../use-cases/subscription/get-activating-subscriptions";
import makeAdminDb from "../../../make-admin-db";
import makePostDb from "../../../make-post-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { AdminModel, PostModel, SubscriptionModel } from "../../../models";
import makeCreatePostController from "./create-post";

describe("createPost", () => {
  beforeAll(async () => await connectDatabase());

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
    const adminDb = makeAdminDb({
      adminDbModel: AdminModel,
      moment,
    });
    const subscriptionDb = makeSubscriptionDb({
      subscriptionDbModel: SubscriptionModel,
      moment,
    });

    const createAdmin = makeCreateAdmin({ adminDb });
    const createPost = makeCreatePost({ postDb });
    const updatePost = makeUpdatePost({ postDb });
    const getPost = makeGetPost({ postDb });
    const getActivatingSubscriptions = makeGetActivatingSubscriptions({
      subscriptionDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_post_data = fakePost();
    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin(mock_admin_data);

    const createPostController = makeCreatePostController({
      createPost,
      getPost,
      getActivatingSubscriptions,
      getEmailContent,
      renderEmailContent,
      sendEmail,
      updatePost,
      logger,
    });

    const request = {
      context: {
        validated: mock_post_data,
        user: created_admin,
      },
    };

    const result = await createPostController(request as any);

    const expected: ExpectSingleResult<IPost> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
