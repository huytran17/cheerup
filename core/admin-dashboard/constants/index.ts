const S3_UPLOAD_URL_TYPES = {
  GALLERY_ITEM: `${process.env.SERVER_URL}/admin/gallery/upload-gallery-item`,
  CATEGORY_THUMBNAIL: `${process.env.SERVER_URL}/admin/category/upload-thumbnail`,
  POST_THUMBNAIL: `${process.env.SERVER_URL}/admin/post/upload-thumbnail`,
  ADMIN_AVATAR: `${process.env.SERVER_URL}/admin/admin/upload-avatar`,
  USER_AVATAR: `${process.env.SERVER_URL}/admin/user/upload-avatar`,
  SYSTEM_CONFIG_ADMIN_META_LOGO: `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-logo`,
  SYSTEM_CONFIG_CLIENT_META_LOGO: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-logo`,
  SYSTEM_CONFIG_ADMIN_META_FAVICON: `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-favicon`,
  SYSTEM_CONFIG_ADMIN_META_FOLDER_ICON: `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-folder-icon`,
  SYSTEM_CONFIG_CLIENT_META_FAVICON: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-favicon`,
  SYSTEM_CONFIG_CLIENT_META_OWNER_AVATAR: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-owner-avatar`,
};

const ADMIN_TYPES = {
  OWNER: "owner",
  COLLABORATOR: "collaborator",
  EDITOR: "editor",
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
  S3_UPLOAD_URL_TYPES,
  ADMIN_TYPES,
  HTTP_STATUS_CODE,
});

export { S3_UPLOAD_URL_TYPES, ADMIN_TYPES, HTTP_STATUS_CODE };
