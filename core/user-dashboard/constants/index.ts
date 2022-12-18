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

const S3_UPLOAD_URL_TYPES = {
  USER_AVATAR: `${process.env.SERVER_URL}/api/user/upload-avatar`,
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

export default Object.freeze({
  SOCIAL_MEDIA_TYPES,
  SOCIALITE_URL,
  S3_UPLOAD_URL_TYPES,
  HTTP_STATUS_CODE,
});

export {
  SOCIAL_MEDIA_TYPES,
  SOCIALITE_URL,
  S3_UPLOAD_URL_TYPES,
  HTTP_STATUS_CODE,
};
