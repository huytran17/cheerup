const createUserRules = {
  email: "required|string",
  hash_password: "required|string",
  is_blocked_comment: "boolean",
  full_name: "string",
};

export default createUserRules;
