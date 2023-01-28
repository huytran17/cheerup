const SOCIAL_MEDIA_TYPES = {
  FACEBOOK: "facebook",
  TWITTER: "twitter",
  INSTAGRAM: "instagram",
  GOOGLE_PLUS: "google plus",
  PINTEREST: "pinterest",
  LINKEDIN: "linkedin",
};

const SOCIALITE_URL = {
  GITHUB: "https://github.com/huytran17",
  FACEBOOK: "https://github.com/huytran17",
  TWITTER: "https://github.com/huytran17",
  INSTAGRAM: "https://github.com/huytran17",
  GOOGLE_PLUS: "https://github.com/huytran17",
  PINTEREST: "https://github.com/huytran17",
  LINKEDIN: "https://github.com/huytran17",
};

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const COMMENT_LIKE_TYPE = {
  LIKE: "like",
  DISLIKE: "dislike",
};

export default Object.freeze({
  SOCIAL_MEDIA_TYPES,
  SOCIALITE_URL,
  HTTP_STATUS_CODE,
  COMMENT_LIKE_TYPE,
});

export {
  SOCIAL_MEDIA_TYPES,
  SOCIALITE_URL,
  HTTP_STATUS_CODE,
  COMMENT_LIKE_TYPE,
};
