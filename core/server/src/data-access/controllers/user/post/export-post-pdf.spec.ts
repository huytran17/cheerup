import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectExportResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import { readingTimeAnalyzer } from "../../../../../__tests__/reading-time";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { PostModel, UserModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeExportPostPdfController from "./export-post-pdf";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("exportPostPdf", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("should return a body that contains a PDF Buffer", async () => {
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

    const createPost = makeCreatePost({ postDb });
    const createUser = makeCreateUser({ userDb });
    const getPost = makeGetPost({ postDb, logger });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_User = await createUser({
      userDetails: mock_user_data,
    });

    const exportPostPdfController = makeExportPostPdfController({
      getPost,
      readingTimeAnalyzer,
      moment,
    });

    const request = {
      context: {
        validated: created_post,
      },
    };

    const result = await exportPostPdfController(request as any);

    const expected: ExpectExportResult = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
