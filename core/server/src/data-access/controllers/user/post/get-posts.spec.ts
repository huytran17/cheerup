import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { ExpectMultipleResults } from "../../../../../__tests__/__types__/expect-types";
import { fakePost, fakeUser } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makePostDb from "../../../make-post-db";
import makeCommentDb from "../../../make-comment-db";
import makeUserDb from "../../../make-user-db";
import Post from "../../../../database/entities/post";
import { PostModel, UserModel, CommentModel } from "../../../models";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPosts from "../../../../use-cases/post/get-posts";
import makeCountCommentsByPost from "../../../../use-cases/comment/count-comments-by-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeGetPostsController from "./get-posts";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getPosts", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

  it("it should return a body that contains a list of posts entities", async () => {
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
    const commentDb = makeCommentDb({
      commentDbModel: CommentModel,
      moment,
    });

    const createPost = makeCreatePost({ postDb, logger });
    const getPosts = makeGetPosts({ postDb, logger });
    const countCommentsByPost = makeCountCommentsByPost({ commentDb, logger });
    const createUser = makeCreateUser({ userDb, logger });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_User = await createUser({
      userDetails: mock_user_data,
    });

    const getPostsController = makeGetPostsController({
      getPosts,
      countCommentsByPost,
      logger,
    });

    const request = {
      context: {
        validated: {
          ...created_post,
          user_id: created_User._id,
        },
      },
    };

    const result = await getPostsController(request as any);

    const expected: ExpectMultipleResults<Post> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
