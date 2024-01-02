import moment from "moment";
import { merge } from "lodash";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakeComment,
  fakePost,
  fakeUser,
} from "../../../../../__tests__/__mock__";
import { redis } from "../../../../../__tests__/jest-redis";
import { ExpectSingleResult } from "../../../../../__tests__/__types__/expect-types";
import IComment from "../../../../database/interfaces/comment";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { CommentModel, PostModel, UserModel } from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateUser from "../../../../use-cases/user/create-user";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeUpdateComment from "../../../../use-cases/comment/update-comment";
import makeReplyComment from "../../../../use-cases/comment/reply-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeReplyCommentController from "./reply-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("replyComment", () => {
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
    const updateComment = makeUpdateComment({ commentDb });
    const replyComment = makeReplyComment({ commentDb });
    const getComment = makeGetComment({ commentDb });
    const getUser = makeGetUser({ userDb });
    const createUser = makeCreateUser({ userDb });

    const mock_comment_data = fakeComment();
    const mock_post_data = fakePost();
    const mock_user_data = fakeUser();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_user = await createUser({
      userDetails: mock_user_data,
    });

    const final_mock_comment_data = merge({}, mock_comment_data, {
      post: created_post._id,
      user: created_user._id,
    });

    const created_parent_comment = await createComment({
      commentDetails: final_mock_comment_data,
    });

    const replyCommentController = makeReplyCommentController({
      replyComment,
      getComment,
      updateComment,
      getPost,
      getUser,
    });

    delete final_mock_comment_data._id;

    const request = {
      context: {
        validated: merge({}, final_mock_comment_data, {
          parent: created_parent_comment._id,
        }),
        user: created_user,
      },
    };

    const result = await replyCommentController(request as any);

    const expected: ExpectSingleResult<IComment> = {
      headers,
      statusCode: HttpStatusCode.CREATED,
      body: result?.body,
    };

    expect(result).toEqual(expected);
  });
});
