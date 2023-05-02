import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakePost,
  fakeUser,
  fakeComment,
} from "../../../../../__tests__/__mock__";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import Comment from "../../../../database/entities/comment";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import {
  CommentModel,
  PostModel,
  UserModel,
  CommentLikeModel,
} from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeCreateCommentController from "./create-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeCommentLikeDb from "../../../make-comment-like-db";

describe("createComment", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(
    async () => await Promise.all([clearDatabase(), redis.disconnect()])
  );

  it("it should return a body that contains a comment entity", async () => {
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
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });
    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
    });

    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb });
    const createComment = makeCreateComment({ commentDb });
    const createUser = makeCreateUser({ userDb });
    const getUser = makeGetUser({ userDb, logger });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
    });

    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();
    const mock_comment_data = fakeComment();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });
    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const createCommentController = makeCreateCommentController({
      createComment,
      getPost,
      getUser,
      countCommentLikeByCommentAndType,
      getCommentLikeByUserAndComment,
    });

    const request = {
      context: {
        validated: Object.assign({}, mock_comment_data, {
          post: created_post._id,
        }),
        user: created_user,
      },
    };

    const result = await createCommentController(request as any);

    const expected: ExpectSingleResult<Comment> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
