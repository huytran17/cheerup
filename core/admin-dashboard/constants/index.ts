const S3_UPLOAD_URL_TYPES = {
  CATEGORY_THUMBNAIL: `${process.env.SERVER_URL}/admin/category/upload-thumbnail`,
  POST_THUMBNAIL: `${process.env.SERVER_URL}/admin/post/upload-thumbnail`,
  ADMIN_AVATAR: `${process.env.SERVER_URL}/admin/admin/upload-avatar`,
  USER_AVATAR: `${process.env.SERVER_URL}/admin/user/upload-avatar`,
  SYSTEM_CONFIG_ADMIN_META_LOGO: `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-logo`,
  SYSTEM_CONFIG_CLIENT_META_LOGO: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-logo`,
  SYSTEM_CONFIG_ADMIN_META_FAVICON: `${process.env.SERVER_URL}/admin/system-configuration/upload-admin-meta-favicon`,
  SYSTEM_CONFIG_CLIENT_META_FAVICON: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-favicon`,
  SYSTEM_CONFIG_CLIENT_META_OWNER_AVATAR: `${process.env.SERVER_URL}/admin/system-configuration/upload-client-meta-owner-avatar`,
};

const ADMIN_TYPES = {
  SUPER: "super",
  NORMAL: "normal",
};

export default Object.freeze({
  S3_UPLOAD_URL_TYPES,
  ADMIN_TYPES,
});

export { S3_UPLOAD_URL_TYPES, ADMIN_TYPES };
