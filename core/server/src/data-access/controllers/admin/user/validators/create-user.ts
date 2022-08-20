const createUserRules = {
  email: "required|string",
  hash_password: "required|string",
  is_blocked_comment: "boolean",
};

export default createUserRules;
