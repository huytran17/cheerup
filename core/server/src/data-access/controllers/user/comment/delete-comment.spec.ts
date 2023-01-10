import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import { fakeComment } from "../../../../../__tests__/__mock__";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeUserDb from "../../../make-user-db";
import { CommentModel, PostModel, UserModel } from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
import makeGetUser from "../../../../use-cases/user/get-user";
import makeCreateComment from "../../../../use-cases/comment/create-comment";
import makeDeleteComment from "../../../../use-cases/comment/delete-comment";
import makeGetComment from "../../../../use-cases/comment/get-comment";
import makeDeleteCommentController from "./delete-comment";
import { HttpStatusCode } from "../../../../constants/http-status-code";

describe("deleteComment", () => {
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
    const createComment = makeCreateComment({ commentDb, logger });
    const deleteComment = makeDeleteComment({ commentDb, logger });
    const getComment = makeGetComment({ commentDb, logger });
    const getUser = makeGetUser({ userDb, logger });

    const mock_comment_data = fakeComment();

    const created_comment = await createComment({
      commentDetails: mock_comment_data,
    });

    const deleteCommentController = makeDeleteCommentController({
      getComment,
      deleteComment,
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
          _id: created_comment.user,
        },
      },
    };

    const result = await deleteCommentController(request as any);

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
