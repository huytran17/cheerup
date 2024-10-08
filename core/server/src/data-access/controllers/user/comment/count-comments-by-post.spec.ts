import moment from "moment";
import { fakePost } from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import { logger } from "../../../../../__tests__/jest-logger";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { randomCacheTime } from "../../../../config/random-cache-time";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import { CommentModel, PostModel } from "../../../models";
import makeCountCommentsByPostController from "./count-comments-by-post";

describe("countCommentsByPost", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a number of comments in the post", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });
    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });

    const getPost = makeGetPost({ postDb });
    const createPost = makeCreatePost({ postDb });
    const countCommentsByPost = makeCountCommentsByPost({
      commentDb,
      randomCacheTime,
      redis,
      logger,
    });

    const mock_post_data = fakePost();

    const created_post = await createPost(mock_post_data);

    const countCommentsByPostController = makeCountCommentsByPostController({
      countCommentsByPost,
      getPost,
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
