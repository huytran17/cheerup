const createUserRules = {
  email: "required|string",
  hash_password: "required|string", //TODO need to check why is hash_password
  is_blocked_comment: "boolean",
  full_name: "string",
};

export default createUserRules;
