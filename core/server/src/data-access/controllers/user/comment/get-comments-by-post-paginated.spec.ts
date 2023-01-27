import moment from "moment";
import {
  connectDatabase,
  clearDatabase,
} from "../../../../../__tests__/jest-mongo";
import {
  fakeComment,
  fakePost,
  fakeQueryParams,
} from "../../../../../__tests__/__mock__";
import { ExpectPaginatedResult } from "../../../../../__tests__/__types__/expect-types";
import Comment from "../../../../database/entities/comment";
import { logger } from "../../../../../__tests__/jest-logger";
import makeCommentDb from "../../../make-comment-db";
import makePostDb from "../../../make-post-db";
import makeCommentLikeDb from "../../../make-comment-like-db";
import { CommentModel, PostModel, CommentLikeModel } from "../../../models";
import makeGetPost from "../../../../use-cases/post/get-post";
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
    await clearDatabase();
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
      moment,
    });

    const getPost = makeGetPost({ postDb, logger });
    const createPost = makeCreatePost({ postDb, logger });
    const countCommentLikeByCommentAndType =
      makeCountCommentLikeByCommentAndType({ commentLikeDb, logger });
    const getCommentLikeByUserAndComment = makeGetCommentLikeByUserAndComment({
      commentLikeDb,
      logger,
    });
    const createComment = makeCreateComment({ commentDb, logger });
    const getCommentsByPostPaginated = makeGetCommentsByPostPaginated({
      commentDb,
      logger,
    });

    const mock_comment_data = fakeComment();
    const mock_post_data = fakePost();

    const created_post = await createPost({
      postDetails: mock_post_data,
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
        logger,
      });

    const query_params = fakeQueryParams();

    const request = {
      context: {
        validated: {
          ...query_params,
          post_id: created_post._id,
        },
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
