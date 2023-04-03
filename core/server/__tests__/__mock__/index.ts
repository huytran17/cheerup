import { faker } from "@faker-js/faker";

import makeFakeUser from "./make-fake-user";
import makeFakeAdmin from "./make-fake-admin";
import makeFakeCategory from "./make-fake-category";
import makeFakeComment from "./make-fake-comment";
import makeFakeGallery from "./make-fake-gallery";
import makeFakePostBookmark from "./make-fake-post-bookmark";
import makeFakePost from "./make-fake-post";
import makeFakeSubscription from "./make-fake-subscription";
import makeFakeQueryParams from "./make-fake-query-params";
import makeFakeCommentLike from "./make-fake-comment-like";
import makeFakeSystemConfiguration from "./make-fake-system-configuration";
import makeFakePasswordReset from "./make-fake-password-reset";

const fakeUser = makeFakeUser({ faker });
const fakeAdmin = makeFakeAdmin({ faker });
const fakeCategory = makeFakeCategory({ faker });
const fakeComment = makeFakeComment({ faker });
const fakeGallery = makeFakeGallery({ faker });
const fakePostBookmark = makeFakePostBookmark({ faker });
const fakePost = makeFakePost({ faker });
const fakeSubscription = makeFakeSubscription({ faker });
const fakeQueryParams = makeFakeQueryParams({ faker });
const fakeCommentLike = makeFakeCommentLike({ faker });
const fakeSystemConfiguration = makeFakeSystemConfiguration({ faker });
const fakePasswordReset = makeFakePasswordReset({ faker });

export default Object.freeze({
  fakeUser,
  fakeAdmin,
  fakeCategory,
  fakeComment,
  fakeGallery,
  fakePostBookmark,
  fakePost,
  fakeSubscription,
  fakeQueryParams,
  fakeCommentLike,
  fakeSystemConfiguration,
  fakePasswordReset,
});

export {
  fakeUser,
  fakeAdmin,
  fakeCategory,
  fakeComment,
  fakeGallery,
  fakePostBookmark,
  fakePost,
  fakeSubscription,
  fakeQueryParams,
  fakeCommentLike,
  fakeSystemConfiguration,
  fakePasswordReset,
};
