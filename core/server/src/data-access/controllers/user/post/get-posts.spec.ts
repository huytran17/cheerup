import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakePost } from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import makePostDb from "../../../make-post-db";
import makeCommentDb from "../../../make-comment-db";
import IPost from "../../../../database/interfaces/post";
import { PostModel, CommentModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPosts from "../../../../use-cases/post/get-posts";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeGetPostsController from "./get-posts";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getPosts", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a list of posts entities", async () => {
    const headers = {
      "Content-Type": "application/json",
    };

    const postDb = makePostDb({
      postDbModel: PostModel,
      moment,
    });
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
    });

    const createPost = makeCreatePost({ postDb });
    const getPosts = makeGetPosts({ postDb });
    const countCommentsByPost = makeCountCommentsByPost({ commentDb });

    const mock_post_data = fakePost();

    await createPost({
      postDetails: mock_post_data,
    });

    const getPostsController = makeGetPostsController({
      getPosts,
      countCommentsByPost,
    });

    const request = {
      context: {},
    };

    const result = await getPostsController(request as any);

    const expected: ExpectMultipleResults<IPost> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
