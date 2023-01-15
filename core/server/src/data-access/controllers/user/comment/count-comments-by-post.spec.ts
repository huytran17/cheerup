import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { fakePost } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import { CommentModel, PostModel } from "../../../models";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCountCommentsByPostController from "./count-comments-by-post";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("countCommentsByPost", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a number of comments in the post", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });
    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb, logger });
    const countCommentsByPost = makeCountCommentsByPost({ commentDb, logger });

    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const countCommentsByPostController = makeCountCommentsByPostController({
      countCommentsByPost,
      getPost,
      logger,
    });

    const request = {
      context: {
        validated: {
          post_id: created_post._id,
        },
      },
    };

    const result = await countCommentsByPostController(request as any);

    const expected: ExpectSingleResult<number> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
