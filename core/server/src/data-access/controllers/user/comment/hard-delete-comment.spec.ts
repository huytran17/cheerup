import moment from "moment";
import {
  fakeComment,
  fakePost,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import {
  clearDatabase,
  connectDatabase,
} from "../../../../../__tests__/jest-mongo";
import { redis } from "../../../../../__tests__/jest-redis";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import IComment from "../../../../database/interfaces/comment";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeHardDeleteComment from "../../../../use-cases/comment/hard-delete-comment";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { CommentModel, PostModel, UserModel } from "../../../models";
import makeHardDeleteCommentController from "./hard-delete-comment";

describe("hardDeleteComment", () => {
  beforeAll(async () => await connectDatabase());

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a comment entity", async () => {
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
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const getPost = makeGetPost({ postDb });
    const createPost = makeCreatePost({ postDb });
    const createComment = makeCreateComment({ commentDb });
    const hardDeleteComment = makeHardDeleteComment({ commentDb });
    const getComment = makeGetComment({ commentDb });
    const createUser = makeCreateUser({ userDb });

    const mock_comment_data = fakeComment();
    const mock_user_data = fakeUser();
    const mock_post_data = fakePost();

    const [created_user, created_post] = await Promise.all([
      createUser(mock_user_data),
      createPost(mock_post_data),
    ]);

    const created_comment = await createComment({
      ...mock_comment_data,
      user: created_user,
      post: created_post,
    });

    const hardDeleteCommentController = makeHardDeleteCommentController({
      getComment,
      hardDeleteComment,
      getPost,
    });

    const request = {
      context: {
        validated: created_comment,
        user: created_user,
      },
    };

    const result = await hardDeleteCommentController(request as any);

    const expected: ExpectSingleResult<IComment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
