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

const LOGIN_FAILED = {
  MAX: 5,
};

const SOCKETIO_NSP = {
  PRIVATE_ADMIN: "private-admin",
};

enum SOCKETIO_EMIT_EVENT {
  ONLINE = "online",
}

const EXCEL_TEMPLATE_TYPE = {
  ADMIN: "admin",
  USER: "user",
};

const MIME_TYPES = {
  EXCEL:
    "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export default Object.freeze({
  ADMIN_TYPES,
  HTTP_STATUS_CODE,
  LOGIN_FAILED,
  SOCKETIO_NSP,
  SOCKETIO_EMIT_EVENT,
  EXCEL_TEMPLATE_TYPE,
  MIME_TYPES,
});

export {
  ADMIN_TYPES,
  HTTP_STATUS_CODE,
  LOGIN_FAILED,
  SOCKETIO_NSP,
  SOCKETIO_EMIT_EVENT,
  EXCEL_TEMPLATE_TYPE,
  MIME_TYPES,
};
