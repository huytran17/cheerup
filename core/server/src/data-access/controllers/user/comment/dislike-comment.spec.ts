import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeComment, fakePost } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { CommentModel, PostModel, UserModel } from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeCreatePost from "../../../../use-cases/post/create-post";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeUpdateComment from "../../../../use-cases/comment/update-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeDislikeCommentController from "./dislike-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("dislikeComment", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await clearDatabase();
  });

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

    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb, logger });
    const createComment = makeCreateComment({ commentDb, logger });
    const updateComment = makeUpdateComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });
    const getUser = makeGetUser({ userDb, logger });

    const mock_comment_data = fakeComment();
    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
    });

    const created_comment = await createComment({
      commentDetails: Object.assign(mock_comment_data, {
        post: created_post._id,
      }),
    });

    const dislikeCommentController = makeDislikeCommentController({
      getComment,
      updateComment,
      getPost,
      getUser,
      logger,
    });

    const request = {
      context: {
        validated: {
          _id: created_comment._id,
        },
        user: {
          _id: created_comment.user.toString(),
        },
      },
    };

    const result = await dislikeCommentController(request as any);

    const expected = {
      headers,
      statusCode: HttpStatusCode.OK,
      body: {
        data: result?.body?.data,
      },
    };

    expect(result).toEqual(expected);
  });
});
