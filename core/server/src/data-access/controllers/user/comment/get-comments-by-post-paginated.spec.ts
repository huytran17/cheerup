import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakeComment,
  fakePost,
  fakeQueryParams,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { ExpectPaginatedResult } from "../../../../../__tests__/__types__/expect-types";
import Comment from "../../../../database/entities/comment";
import { logger } from "../../../../../__tests__/jest-logger";
import { redis } from "../../../../../__tests__/jest-redis";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import {
  CommentModel,
  PostModel,
  CommentLikeModel,
  UserModel,
} from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeCountCommentLikeByCommentAndType from "../../../../use-cases/comment-like/count-comment-like-by-comment-and-type";
import makeGetCommentLikeByUserAndComment from "../../../../use-cases/comment-like/get-comment-like-by-user-and-comment";
import makeGetCommentsByPostPaginated from "../../../../use-cases/comment/get-comments-by-post-paginated";
import makeGetCommentsByPostPaginatedController from "./get-comments-by-post-paginated";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("getCommentsByPostPaginated", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await Promise.all([clearDatabase(), redis.disconnect()]);
  });

  it("it should return a body that contains pagination data type of comments", async () => {
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
    const commentLikeDb = makeCommentLikeDb({
      commentLikeDbModel: CommentLikeModel,
    });
    const userDb = makeUserDb({
      userDbModel: UserModel,
      moment,
    });

    const createUser = makeCreateUser({ userDb });
    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
    });
    const createComment = makeCreateComment({ commentDb });
    const getCommentsByPostPaginated = makeGetCommentsByPostPaginated({
      commentDb,
      logger,
    });

    const mock_comment_data = fakeComment();
    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    await createComment({
      commentDetails: Object.assign(mock_comment_data, {
        post: created_post._id,
      }),
    });

    const getCommentsByPostPaginatedController =
      makeGetCommentsByPostPaginatedController({
        getCommentsByPostPaginated,
        getPost,
        countCommentLikeByCommentAndType,
        getCommentLikeByUserAndComment,
      });

    const query_params = fakeQueryParams();

    const request = {
      context: {
        validated: {
          ...query_params,
          post_id: created_post._id,
        },
        user: created_user,
      },
    };

    const result = await getCommentsByPostPaginatedController(request as any);

    const expected: ExpectPaginatedResult<Comment> = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
