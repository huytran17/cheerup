import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  getEmailContent,
  renderEmailContent,
  sendEmail,
} from "../../../../config/emailManager";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost, fakeAdmin } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import makeAdminDb from "../../../make-admin-db";
import makeSubscriptionDb from "../../../make-subscription-db";
import { PostModel, AdminModel, SubscriptionModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeUpdatePost from "../../../../use-cases/post/update-post";
import makeGetActivatingSubscriptions from "../../../../use-cases/subscription/get-activating-subscriptions";
import makeGetAdmin from "../../../../use-cases/admin/get-admin";
import makeCreateAdmin from "../../../../use-cases/admin/create-admin";
import makeCreatePostController from "./create-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import Post from "../../../../database/entities/post";

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
    const getAdmin = makeGetAdmin({ adminDb, logger });
    const getActivatingSubscriptions = makeGetActivatingSubscriptions({
      subscriptionDb,
      logger,
    });

    const mock_post_data = fakePost();
    const mock_admin_data = fakeAdmin();

    const created_admin = await createAdmin({ adminDetails: mock_admin_data });

    const createPostController = makeCreatePostController({
      createPost,
      getAdmin,
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

    const expected: ExpectSingleResult<Post> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
