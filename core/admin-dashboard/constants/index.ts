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
  ADMIN_TYPES,
  HTTP_STATUS_CODE,
});

export { ADMIN_TYPES, HTTP_STATUS_CODE };
